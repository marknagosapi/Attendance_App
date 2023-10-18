import face_recognition
from PIL import Image, ImageDraw
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
        # img.crop((left,top,right,bottom)).show()
        img2.rectangle([(left,top),(right,bottom)])

    originalImage.save("withBorders." + extention)