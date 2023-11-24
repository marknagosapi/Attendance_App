import face_recognition
from database import uploadFace, getStudentsFacesAndIds, getUserById
import io

async def learnFace(userId, imageFile):
    imageBytes = await imageFile.read()
    imageBytes = io.BytesIO(imageBytes)

    image = face_recognition.load_image_file(imageBytes)
    imageEncoded = face_recognition.face_encodings(image)

    if len(imageEncoded) > 1: return "More than one face"
    if len(imageEncoded) == 0: return "Face not found"
    
    return uploadFace(userId,imageEncoded[0].tolist(),imageBytes.getvalue())
    

async def getFaceData(imageFile,classId):
    imageBytes = await imageFile.read()
    imageBytes = io.BytesIO(imageBytes)

    image = face_recognition.load_image_file(imageBytes)
    imageEncoded = face_recognition.face_encodings(image)

    students = getStudentsFacesAndIds(classId)
    users = []
  
    for face in imageEncoded:
        wichFace = face_recognition.compare_faces(students["faces"],face)
        for isPresent, id in zip(wichFace,students["ids"]):
            user = getUserById(id)
            user["userId"] = id
            user["isPresent"] = isPresent
            users.append(user)
    
    for id in students["restIds"]:
        user = getUserById(id)
        user["userId"] = id
        user["isPresent"] = False
        users.append(user)
    return users   