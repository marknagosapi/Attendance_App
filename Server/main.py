from fastapi import FastAPI, responses, UploadFile, File
from faceDetection import *
from database import uploadNewUser, getUserByNameAndPassword, addNewClass, getUserClasses, addStudentToClass
import database
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

@app.post("/learn_face")
async def saveFace(userId: str, imageFile: UploadFile = File(...)):
  return await learnFace(userId, imageFile)

@app.post("/check")
async def check(classId:str, imageFile: UploadFile = File(...)):
  return await getFaceData(imageFile,classId)


class RegisterBody(BaseModel):
  userName: str
  password: str
  email: str
  userType: str
  major: Optional[str] = None

@app.post("/register")
def register(regBody: RegisterBody):
  if regBody.userType == "student" and regBody.major == None: return False
  return uploadNewUser(regBody.model_dump())


class LoginBody(BaseModel):
  email: str
  password: str

@app.post("/login")
def login(loginBody: LoginBody):
  return getUserByNameAndPassword(loginBody.email, loginBody.password)

class CreateClassBody(BaseModel):
  teacherId: str
  className: str
  majors: list[str]
  maxAttendance: Optional[int] = None

@app.post("/create_class")
def addClass(classBody: CreateClassBody):
  if classBody.maxAttendance == None: classBody.maxAttendance = 14
  return addNewClass(classBody.model_dump())

@app.get("/get_class")
def getClass(classId:str):
  return database.getClass(classId)

@app.get("/get_classes")
def getClasses(userId:str):
  return getUserClasses(userId)

@app.get("/get_class_students")
def getClassStudents(classId:str):
  return database.getClassStudents(classId)

@app.get("/join_to_class")
def joinStudent(studentId:str, classCode:str):
  return addStudentToClass(classCode,studentId)