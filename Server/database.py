import random, string
import firebase_admin
from firebase_admin import credentials, firestore 
from google.cloud.firestore_v1.client import Client
from google.cloud.firestore_v1.base_query import FieldFilter, BaseCompositeFilter
from google.cloud.firestore_v1.types import StructuredQuery

cred = credentials.Certificate("db_key.json")
firebase_admin.initialize_app(cred)

db:Client = firestore.client()
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

def uploadNewUser(user):

    composite_filter = BaseCompositeFilter(
        operator=StructuredQuery.CompositeFilter.Operator.AND,
        filters=[
            FieldFilter("email", "==", user["email"]),
            FieldFilter("password", "==", user["password"])
        ]
    )

    isUserExists = len(refUsers.where(filter = composite_filter).get()) != 0

    if isUserExists: return False

    userId = refUsers.add(user)[1].id

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
    compositeFilter = BaseCompositeFilter(
        operator=StructuredQuery.CompositeFilter.Operator.AND,
        filters=[
            FieldFilter("email", "==", email),
            FieldFilter("password", "==", password)
        ]
    )
    user = refUsers.where(filter=compositeFilter).get()
    if user == []: return None
    
    id = user[0].id
    user = user[0].to_dict()
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

def addAttendaceForClass(classId,studentIds:list):
    refClass = refClasses.document(classId)
    for studentId in studentIds:
        attendance = refClass.collection("students").document(studentId).get().to_dict()["attendance"] + 1
        refClass.collection("students").document(studentId).update({"attendance": attendance})

def getClass(classId):
    return refClasses.document(classId).get().to_dict()

def getClassStudents(classId):
    users = []
    for user in refClasses.document(classId).collection("students").stream():
        refUser = refUsers.document(user.id).get().to_dict()
        refUser["userId"] = user.id
        refUser["attendance"] = user.to_dict()["attendance"]
        users.append(refUser)
    
    return users

def asd():

    return None