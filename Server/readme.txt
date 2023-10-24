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


Image upload needed for come in HTTP "form" and the extra information in the link
ex. http://127.0.0.1:8000/learn_face?name=UserName