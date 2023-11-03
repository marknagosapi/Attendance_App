import face_recognition
from PIL import Image, ImageDraw
from database import *
import io

# get a file and the extention and save the file with the faces boxed in
async def locateFaces(imageFile,extention: str):
    imageBytes = await imageFile.read()
    imageBytes = io.BytesIO(imageBytes)

    image = face_recognition.load_image_file(imageBytes)
    face_locations = face_recognition.face_locations(image)

    originalImage = Image.open(imageBytes)
    img2 = ImageDraw.Draw(originalImage)

    for (top,right,bottom,left) in face_locations:
        # originalImage.crop((left,top,right,bottom)).save("${top}.png")
        img2.rectangle([(left,top),(right,bottom)])
    del img2
    originalImage.save("images/withBorders." + extention)


async def learnFace(userId, imageFile):
    imageBytes = await imageFile.read()
    imageBytes = io.BytesIO(imageBytes)

    image = face_recognition.load_image_file(imageBytes)
    imageEncoded = face_recognition.face_encodings(image)[0]
    
    uploadFace(userId,imageEncoded.tolist())
    

async def getFaceData(imageFile):
    imageBytes = await imageFile.read()
    imageBytes = io.BytesIO(imageBytes)

    image = face_recognition.load_image_file(imageBytes)
    imageEncoded = face_recognition.face_encodings(image)

    students = getStudentsFacesAndIds()
    
    for face in imageEncoded:
        wichFace = face_recognition.compare_faces(students["faces"],face)
        for isIn, id in zip(wichFace,students["ids"]):
            if isIn: return id
    return None                
    

    