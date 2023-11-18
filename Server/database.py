import random, string, json, requests
import firebase_admin
import models
from firebase_admin import credentials, firestore, auth, messaging
from google.cloud.firestore_v1 import ArrayUnion, ArrayRemove
from google.cloud.firestore_v1.client import Client
from google.cloud.firestore_v1.base_query import FieldFilter, BaseCompositeFilter
from google.cloud.firestore_v1.types import StructuredQuery
from google.cloud.firestore_v1.field_path import FieldPath

cred = credentials.Certificate("db_key.json")
app = firebase_admin.initialize_app(cred)

apiKey = json.load(open("config.json"))["apiKey"]
signUpLink = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={apiKey}"
signInLink = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={apiKey}"

db:Client = firestore.client(app)

refUsers = db.collection("Users")
refFaces = db.collection("Faces")
refClasses = db.collection("Classes")

def uploadFace(userId,encodedFace:list):

    if getUserById(userId) == None: return "User not exists"

    data = {
        "encodedFace": encodedFace
    }
    refFaces.document(userId).set(data)

def deleteFace(faceId):
    refFaces.document(faceId).delete()

def getStudentsFacesAndIds(classId):
    ids = []
    faces = []
    withNoFaces = []

    for user in refClasses.document(classId).collection("students").stream():
        userFace = refFaces.document(user.id).get().to_dict()
        if userFace == None: 
            withNoFaces.append(user.id)
            continue
        if userFace.get("encodedFace",None) == None:
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
    if user == None: return None

    user["email"] = getUserEmail(id)
    return user

def getUserEmail(id):
    return auth.get_user(id).email

def updateUser(user: models.UpdateUserBody):
    try:
        auth.update_user(user.userId ,email=user.email)
    except:
        # check if password is exists and longer than 6
        if not (user.password != None and len(user.password) >= 6): return "PASSWORD_TO_SHORT"
        return "INVALID_EMAIL"

    refUsers.document(user.userId).update({
        "userName": user.name,
        "major": user.major
    })

def deleteUser(userId):
    refUser = refUsers.document(userId)
    user = refUser.get().to_dict()

    if user == None: return "User is not exits"

    if user["userType"] == "teacher":
        for refClass in refClasses.where(filter= FieldFilter("teacherId", "==", userId)).stream():
            refClass._reference.delete()

        refUser.delete()
        auth.delete_user(userId)
        return

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

    # Add student to classes
    for refClass in refClasses.where(filter= FieldFilter("majors", "array_contains", user["major"])).get():
        refClasses.document(refClass.id).collection("students").document(userId).set({"attendance": 0})

    return user

def getUserByNameAndPassword(email, password):
    req = requests.post(signInLink, data={
        "email": email,
        "password": password,
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

    for student in refUsers.where(filter= compositeFilter).stream():
        refClasses.document(classId).colletion("students").document(student.id).set({"attendance": 0})

    return True

def deleteClass(classId):
    refClass = refClasses.document(classId)
    
    refUsers.document(refClass.get().to_dict()["teacherId"]).update({"classes": ArrayRemove([classId])})
    refClass.delete()

def updateClass(classBody):
    refClass = refClasses.document(classBody["classId"])
    del classBody["classId"]
    refClass.update(classBody)

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
        if attendance == None: continue
        Class = refClass.to_dict()
        Class["attendance"] = attendance["attendance"]
        Class["classId"] = refClass.id
        classes.append(Class)

    return classes
    
def addStudentToClass(classCode,studentId):
    classes = refClasses.where(filter= FieldFilter("classCode", "==", classCode)).get()
    if classes == []: return False
    classId = classes[0]

    if getUserById(studentId) == None: return False

    refClasses.document(classId).collection("students").document(studentId).set({"attendance": 0})
    return True

def addAttendaceForClass(classId,studentIds:list[str]):
    refClass = refClasses.document(classId)
    for studentId in studentIds:
        student = refClass.collection("students").document(studentId).get().to_dict()
        if student == None: return False

        attendance = student["attendance"] + 1
        refClass.collection("students").document(studentId).update({"attendance": attendance})
    return True
    # className = refClass.get().to_dict()["className"]

    # messaging.send(messaging.Message(notification=messaging.Notification(f"Attendance confirmed"),topic=className))

def getClass(classId):
    return refClasses.document(classId).get().to_dict()

def getClassStudents(classId):
    users = []
    for refUser in refClasses.document(classId).collection("students").stream():
        user = refUsers.document(refUser.id).get().to_dict()
        user["userId"] = refUser.id
        user["attendance"] = refUser.to_dict()["attendance"]
        users.append(user)
    
    return users