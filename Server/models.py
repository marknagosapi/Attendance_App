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

class CreateClassBody(BaseModel):
  teacherId: str
  className: str
  majors: list[str]
  maxAttendance: Optional[int] = None

class attendanceBody(BaseModel):
  classId: str
  userIds: list[str]