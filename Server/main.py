from fastapi import FastAPI, responses, UploadFile, File
from faceDetection import *
from models import LoginBody, RegisterBody, CreateClassBody, attendanceBody
from database import uploadNewUser, getUserByNameAndPassword, addNewClass, getUserClasses, addStudentToClass, addAttendaceForClass
import database

app = FastAPI()

@app.post("/learn_face")
async def saveFace(userId: str, imageFile: UploadFile = File(...)):
  return await learnFace(userId, imageFile)

@app.post("/check")
async def check(classId:str, imageFile: UploadFile = File(...)):
  return await getFaceData(imageFile,classId)

@app.post("/register")
def register(regBody: RegisterBody):
  if regBody.userType == "student" and regBody.major == None: return False
  regBody.major = regBody.major.lower()
  return uploadNewUser(regBody.model_dump())

@app.post("/login")
def login(loginBody: LoginBody):
  return getUserByNameAndPassword(loginBody.email, loginBody.password)

@app.post("/create_class")
def addClass(classBody: CreateClassBody):
  if classBody.maxAttendance == None: classBody.maxAttendance = 14
  for i in range(len(classBody.majors)):
    classBody.majors[i] = classBody.majors[i].lower()
  return addNewClass(classBody.model_dump())

@app.get("/get_user")
def getUser(userId:str):
  return getUserById(userId)

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

app.post("/add_attendance")
def addAttendance(attendanceBody: attendanceBody):
  return addAttendaceForClass(attendanceBody.classId,attendanceBody.userIds)