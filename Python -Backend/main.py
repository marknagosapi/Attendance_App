from fastapi import FastAPI, responses, UploadFile, File
from faceDetection import locateFaces

app = FastAPI()

# return last picture with boxes
@app.get("/")
def getImage():
  file = open("withBorders.jpeg",mode="rb")
  return responses.StreamingResponse(file, media_type="image/jpg",status_code=200)

# get an image from body and return back with the faces boxed in
@app.post("/")
async def uploadImage(imageFile: UploadFile = File(...)):
  extention = imageFile.headers.values()[1][6:]
  file = await locateFaces(imageFile,extention)

  file = open("withBorders." + extention,mode="rb")
  return responses.StreamingResponse(file, media_type=imageFile.headers.values()[1], status_code=200)

