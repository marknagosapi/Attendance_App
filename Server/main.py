from fastapi import FastAPI, responses, UploadFile, File
from faceDetection import *
from database import uploadNewUser
from pydantic import BaseModel

app = FastAPI()

@app.post("/learn_face")
async def saveFace(userId: str, imageFile: UploadFile = File(...)):
  await learnFace(userId, imageFile)

@app.post("/check")
async def check(imageFile: UploadFile = File(...)):
  return await getFaceData(imageFile)


class registerBody(BaseModel):
  userName: str
  password: str
  email: str
  userType: str

@app.post("/register")
def register(regBody: registerBody):
  return uploadNewUser(regBody)


class loginBody(BaseModel):
  userName: str
  password: str

@app.post("/login")
def login(loginBody: loginBody):
  userId = getUserByNameAndPassword(loginBody.userName, loginBody.password)

  return userId