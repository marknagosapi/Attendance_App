Dependencies:
pip install fastapi
pip install uvicorn
pip install face_recognition
pip install pillow
pip install firebase_admin


start backend:
uvicorn main:app --workers 4 --host 0.0.0.0 (for release)
uvicorn main:app --reload (for developing)
http://127.0.0.1:8000


Image upload needed for come in HTTP "form"

Endpoints:
POST /login 
    body:
        {
        "userName": userName,
        "password": password
        }
    returns: user if successful, else returns null

POST /register
    body:
        {
        "userName": "string",
        "password": "string",
        "email": "string",
        "userType": "string"
        }
    returns: user if successful, else returns null

POST /check
    body: 
        Form: Image
    returns: user if successful, else returns null

POST /learn_face?name=userId
    body:
        Form: Image
    returns: nothing if successful or "User not exists", "More than one face", "Face not found" 

POST /create_class
    body:
        {
        "teacherIds": [
            "string"
        ],
        "className": "string",
        "majors": [
            "string"
        ],
        "maxAttendance": null -> 14 | int
        }
    returns: boolean if successful or not

GET /get_class?classId=classId
    returns class if successful, else null

GET /get_classes?userId=userId
    returns list of classes where the user it in

GET /get_class_students?classId=classId
    returns list of students who is in the class