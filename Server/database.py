import random, string, json
import firebase_admin
from firebase_admin import credentials, firestore, auth
from google.cloud.firestore_v1.client import Client
from google.cloud.firestore_v1.base_query import FieldFilter, BaseCompositeFilter
from google.cloud.firestore_v1.types import StructuredQuery
import requests

cred = credentials.Certificate("db_key.json")
app = firebase_admin.initialize_app(cred)

apiKey = json.load(open("config.json"))["apiKey"]
signUpLink = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={apiKey}"
signInLink = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={apiKey}"

db:Client = firestore.client(app=app)

refUsers = db.collection("Users")
refFaces = db.collection("Faces")
refClasses = db.collection("Classes")

def uploadFace(userId,encodedFace:list):

    if getUserById(userId) == None: return "User not exists"

    data = {
        "encodedFace": encodedFace
    }
    refFaces.document(userId).set(data)

def getStudentsFacesAndIds(classId):
    ids = []
    faces = []
    withNoFaces = []

    for user in refClasses.document(classId).collection("students").stream():
        userFace = refFaces.document(user.id).get().to_dict()
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
    return refUsers.document(id).get().to_dict()

def getUserEmail(id):
    auth.get_user(id).email

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
        refUsers.document(userId).update({"calsses": []})
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

    for student in refUsers.where(filter= compositeFilter).stream():
        refClasses.document(classId).colletion("students").document(student.id).set({"attendance": 0})

    return True

def getUserClasses(userId):
    user = getUserById(userId)
    if user == None: return False
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
    classId = refClasses.where(filter= FieldFilter("classCode", "==", classCode)).get()[0].id 
    refClasses.document(classId).collection("students").document(studentId).set({"attendance": 0})

def addAttendaceForClass(classId,studentIds:list[str]):
    refClass = refClasses.document(classId)
    for studentId in studentIds:
        attendance = refClass.collection("students").document(studentId).get().to_dict()["attendance"] + 1
        refClass.collection("students").document(studentId).update({"attendance": attendance})

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