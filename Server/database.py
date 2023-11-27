import random, string, json, requests
import firebase_admin
import models
from websockets import client
from os import getppid
import psutil
from firebase_admin import credentials, firestore, auth
from google.cloud.firestore_v1 import ArrayUnion, ArrayRemove
from google.cloud.firestore_v1.client import Client
from google.cloud.firestore_v1.base_query import FieldFilter, BaseCompositeFilter
from google.cloud.firestore_v1.types import StructuredQuery

cred = credentials.Certificate("db_key.json")
app = firebase_admin.initialize_app(cred)

apiKey = json.load(open("config.json"))["apiKey"]
signUpLink = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={apiKey}"
signInLink = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={apiKey}"

db:Client = firestore.client(app)

refUsers = db.collection("Users")
refFaces = db.collection("Faces")
refClasses = db.collection("Classes")

def uploadFace(userId,encodedFace:list, image):

    if getUserById(userId) is None: return "User not exists"

    data = {
        "Face": image,
        "encodedFace": encodedFace
    }
    refFaces.document(userId).set(data)

def deleteFace(userId):
    refFaces.document(userId).delete()

def getFace(userId):
    face = refFaces.document(userId).get().to_dict()
    if face is None: face = refFaces.document("placeHolder").get().to_dict()
    return face["Face"]

def getStudentsFacesAndIds(classId):
    ids = []
    faces = []
    withNoFaces = []

    for user in refClasses.document(classId).collection("students").stream():
        userFace = refFaces.document(user.id).get().to_dict()
        if userFace is None: 
            withNoFaces.append(user.id)
            continue
        ids.append(user.id)
        faces.append(userFace.get("encodedFace"))
        
    return {
        "ids": ids,
        "faces": faces,
        "restIds": withNoFaces
    }

def getUserById(id: str):
    user = refUsers.document(id).get().to_dict()
    if user is None: return None

    user["email"] = getUserEmail(id)
    return user

def getUserEmail(id):
    return auth.get_user(id).email

def updateUser(user: models.UpdateUserBody):
    try:
        auth.update_user(user.userId ,email=user.email)
    except:
        # check if password is exists and longer than 6
        if not (user.password != None and len(user.password) >= 6): return "PASSWORD_TOO_SHORT"
        return "INVALID_EMAIL"
    
    data = {
        "userName": user.name,
        "major": user.major
    }
    if user.name is None or user.name == "": del data["userName"]
    if user.major is None or user.major == "": del data["major"]

    if data == {}: return
    refUsers.document(user.userId).update(data)

def deleteUser(userId):
    refUser = refUsers.document(userId)
    user = refUser.get().to_dict()

    if user is None: return "User is not exits"

    if user["userType"] == "teacher":
        # Delete teacher's classes
        for refClass in refClasses.where(filter= FieldFilter("teacherId", "==", userId)).stream():
            refClass._reference.delete()

        refUser.delete()
        auth.delete_user(userId)
        return

    # Delete studend from classes
    for student in db.collection_group("students").stream():
        if (student.id == userId): student.reference.delete()
    
    deleteFace(userId)

    refUser.delete()
    auth.delete_user(userId)
    

def uploadNewUser(user):
    regData = {
        "email": user["email"],
        "password": user["password"],
        "returnSecureToken": True
    }

    req = requests.post(signUpLink, data=regData)
    if req.status_code == 400: return req.json()["error"]["message"]

    del user["password"]
    del user["email"]

    userId = req.json()["localId"]
    refUsers.document(userId).set(user)

    user = refUsers.document(userId).get().to_dict()
    user["userId"] = userId

    if user["userType"] == "teacher": 
        refUsers.document(userId).update({"classes": []})
        user["classes"] = []
        return user

    # Add student to classes with the same major
    for refClass in refClasses.where(filter= FieldFilter("majors", "array_contains", user["major"])).get():
        refClasses.document(refClass.id).collection("students").document(userId).set({"attendance": 0})

    return user

def getUserByNameAndPassword(loginBody):
    req = requests.post(signInLink, data={
        "email": loginBody["email"],
        "password": loginBody["password"],
        "returnSecureToken": True
    })
    if req.status_code == 400: return req.json()["error"]["message"]
    
    id = req.json()["localId"]
    user = refUsers.document(id).get().to_dict()
    user["id"] = id
    return user

def addNewClass(classBody):
    isClassExists = len(refClasses.where(filter= FieldFilter("className", "==", classBody["className"])).get()) != 0
    if isClassExists: return False

    compositeFilter = BaseCompositeFilter(
        operator=StructuredQuery.CompositeFilter.Operator.AND,
        filters=[
            FieldFilter("userType", "==", "student"),
            FieldFilter("major", "in", classBody["majors"])
        ]
    )

    classCode = "".join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(6))

    while len(refClasses.where(filter= FieldFilter("classCode", "==", classCode)).get()) != 0:
        classCode = "".join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(6))

    classBody["classCode"] = classCode

    classId = refClasses.add(classBody)[1].id

    refUsers.document(classBody["teacherId"]).update({"classes": ArrayUnion([classId])})

    # Add students with same major
    for student in refUsers.where(filter= compositeFilter).stream():
        refClasses.document(classId).collection("students").document(student.id).set({"attendance": 0})

    return True

def deleteClass(classId):
    refClass = refClasses.document(classId)
    
    refUsers.document(refClass.get().to_dict()["teacherId"]).update({"classes": ArrayRemove([classId])})
    for subCollection in refClass.collection("students").list_documents():
        subCollection.delete()
    refClass.delete()

def updateClass(classBody):
    refClass = refClasses.document(classBody["classId"])
    del classBody["classId"]
    
    if classBody["className"] is None or classBody["className"] == "": del classBody["className"]
    if classBody["majors"] is None or classBody["majors"] == []: del classBody["majors"]
    if classBody["maxAttendance"] is None: del classBody["maxAttendance"]

    if classBody == {}: return
    refClass.update(classBody)

# get user their classes if the user is teacher than without the teacher Id, and if student than geting with attendance
def getUserClasses(userId):
    user = getUserById(userId)
    classes = []

    if user["userType"] == "teacher":
        for refClass in refClasses.where(filter= FieldFilter("teacherId", "==", userId)).stream():
            Class = refClass.to_dict()
            del Class["teacherId"]
            Class["classId"] = refClass.id
            classes.append(Class)
        return classes
    
    
    for refClass in refClasses.stream():
        attendance = refClasses.document(refClass.id).collection("students").document(userId).get().to_dict()
        if attendance is None: continue
        Class = refClass.to_dict()
        Class["attendance"] = attendance["attendance"]
        Class["classId"] = refClass.id
        classes.append(Class)

    return classes
    
def addStudentToClass(classCode,studentId):
    classes = refClasses.where(filter= FieldFilter("classCode", "==", classCode)).get()
    if classes == []: return False
    classId = classes[0].id

    if getUserById(studentId) is None: return False
    print(classId)
    refClasses.document(classId).collection("students").document(studentId).set({"attendance": 0})
    return True

# Add 1 to attendance for all of students from list and notify students about it through a websocket
async def addAttendaceForClass(classId,studentIds:list[str]):
    refClass = refClasses.document(classId)
    for studentId in studentIds:
        student = refClass.collection("students").document(studentId).get().to_dict()
        if student is None: continue

        attendance = student["attendance"] + 1
        refClass.collection("students").document(studentId).update({"attendance": attendance})
        async with client.connect(f"ws://localhost:{psutil.Process(getppid()).connections()[0].laddr.port}/websocket?id={studentId}") as websocket:
            await websocket.send("Attendance Confirmed")
            await websocket.close()

def getClass(classId):
    return refClasses.document(classId).get().to_dict()

# Gett all student from class with attendance
def getClassStudents(classId):
    users = []
    for refUser in refClasses.document(classId).collection("students").stream():
        user = refUsers.document(refUser.id).get().to_dict()
        user["userId"] = refUser.id
        user["attendance"] = refUser.to_dict()["attendance"]
        users.append(user)
    
    return users