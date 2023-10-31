Dependencies:
pip install fastapi
pip install uvicorn
pip install face_recognition
pip install pillow
pip install firebase_admin


start backend:
uvicorn main:app --reload
http://127.0.0.1:8000


Image upload needed for come in HTTP "form"

Endpoints:
POST /login 
    body:
        {
        "userName": userName,
        "password": password
        }
    returns: userId if successful, else returns null

POST /register
    body:
        {
        "userName": "string",
        "password": "string",
        "email": "string",
        "userType": "string"
        }
    returns: boolean if successful or not

POST /check
    body: 
        Form: Image
    returns: userId if successful, else returns null

POST /learn_face/learn_face?name=userId
    body:
        From: Image
    returns: nothing