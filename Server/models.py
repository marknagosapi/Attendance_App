from pydantic import BaseModel
from typing import Optional

class RegisterBody(BaseModel):
  userName: str
  password: str
  email: str
  userType: str
  major: Optional[str] = None

class LoginBody(BaseModel):
  email: str
  password: str
  notificationToken: str

class CreateClassBody(BaseModel):
  teacherId: str
  className: str
  majors: list[str]
  maxAttendance: Optional[int] = None

class AttendanceBody(BaseModel):
  classId: str
  userIds: list[str]

class UpdateUserBody(BaseModel):
  userId: str
  email: Optional[str] = None
  password: Optional[str] = None
  name: Optional[str] = None
  major: Optional[str] = None

class UpdateClassBody(BaseModel):
  classId: str
  className: Optional[str] = None
  majors: Optional[list[str]] = None
  maxAttendance: Optional[int] = None
