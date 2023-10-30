import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("db_key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
ref_users = db.collection("Users")

def uploadFace(userId,encodedFace:list):
    data = {
        "encodedFace": encodedFace
    }
    ref_users.document(userId).update(data)

def getStudentsFacesAndIds():
    users = ref_users.stream()
    faces = []
    ids = []
    for user in users:
        ids.append(user.id)
        faces.append(user.to_dict()["encodedFace"])
    return {
        "ids": ids,
        "faces": faces
    }

def getStudentById(id: str):
    return ref_users.document(id).get().to_dict()

def uploadNewUser(user):
    isUserExists = len(ref_users.where("email", "==", user.email).where("userName", "==", user.userName).get()) != 0

    if isUserExists: return False

    userData = {
        "userName": user.userName,
        "password": user.password,
        "email": user.email,
        "userType": user.userType
    }
    ref_users.add(userData)

    return True

def getUserByNameAndPassword(userName, password):
    user = ref_users.where("userName", "==", userName).where("password", "==", password).get()
    if user == []: return None
    return user[0].id