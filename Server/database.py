import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("db_key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
ref_faces = db.collection("Faces")

def uploadFace(userName,encodedFace:list):
    data = {}
    data["encodedFace"] = encodedFace
    if userName is not None: data["userName"] = userName
    ref_faces.add(data)

def getStudents():
    return ref_faces.stream()
