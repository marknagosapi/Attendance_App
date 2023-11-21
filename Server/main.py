from fastapi import FastAPI, UploadFile, File, WebSocket, Response
from faceDetection import *
import models
import database

app = FastAPI()

@app.post("/learn_face")
async def saveFace(userId: str, imageFile: UploadFile = File(...)):
  return await learnFace(userId, imageFile)

@app.get("/get_face")
def getFace(userId: str):
  face = database.getFace(userId)
  if face == None: return face
  return Response(content=face,media_type="image/png")

@app.post("/check")
async def check(classId:str, imageFile: UploadFile = File(...)):
  return await getFaceData(imageFile,classId)

@app.post("/register")
def register(regBody: models.RegisterBody):
  if regBody.userType == "student" and regBody.major == None: return False
  regBody.major = regBody.major.lower()
  return database.uploadNewUser(regBody.model_dump())

@app.post("/login")
def login(loginBody: models.LoginBody):
  return database.getUserByNameAndPassword(loginBody.model_dump())

@app.get("/get_user")
def getUser(userId:str):
  return getUserById(userId)

@app.put("/update_user")
def updateUser(user: models.UpdateUserBody):
  return database.updateUser(user)

@app.delete("/delete_user")
def deleteUser(userId: str):
  return database.deleteUser(userId)

@app.post("/create_class")
def addClass(classBody: models.CreateClassBody):
  if classBody.maxAttendance == None: classBody.maxAttendance = 14
  for i in range(len(classBody.majors)):
    classBody.majors[i] = classBody.majors[i].lower()
  return database.addNewClass(classBody.model_dump())

@app.put("/update_class")
def updateClass(updateClassBody: models.UpdateClassBody):
  return database.updateClass(updateClassBody.model_dump())

@app.delete("/delete_class")
def deleteClass(classId: str):
  return database.deleteClass(classId)

@app.get("/get_class")
def getClass(classId:str):
  return database.getClass(classId)

@app.get("/get_classes")
def getClasses(userId:str):
  return database.getUserClasses(userId)

@app.get("/get_class_students")
def getClassStudents(classId:str):
  return database.getClassStudents(classId)

@app.get("/join_to_class")
def joinStudent(studentId:str, classCode:str):
  return database.addStudentToClass(classCode,studentId)

@app.post("/add_attendance")
def addAttendance(attendanceBody: models.AttendanceBody):
  return database.addAttendaceForClass(attendanceBody.classId,attendanceBody.userIds)