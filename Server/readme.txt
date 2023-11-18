Install dependencies:
pip install -r requirements.txt


start backend:
uvicorn main:app --workers 4 --host 127.0.0.1 --port 8000 (for release)
uvicorn main:app --reload --host 127.0.0.1 --port 8000 (for developing)
http://127.0.0.1:8000


Image upload needed for come in HTTP "form"

Endpoints:
    learn the face of the given user
    POST /learn_face?name=userId
        body:
            Form: Image     (required)
        returns nothing if successful or "User not exists", 
                                        "More than one face" or 
                                        "Face not found" 

    Check attendance in the given class
    POST /check?classId=classId
        body: 
            Form: Image     (required)
        returns list of user with a field that is present or not

    POST /register
        body:
            {
                "userName": "string",   (required)
                "password": "string",   (required)
                "email": "string",      (required)
                "userType": "string",   (required)
                "major": "string"       (required if a student)
            }
        returns user if successful, else returns "EMAIL_EXISTS", 
                                                "INVALID_EMAIL" or 
                                                "WEAK_PASSWORD : Password should be at least 6 characters"

    POST /login 
        body:
            {
                "userName": "string",   (required)
                "password": "string"    (required)
            }
        returns user if successful, else returns "INVALID_EMAIL" or "INVALID_LOGIN_CREDENTIALS"
    
    GET /get_user?userId=userId
        returns user if successful, else returns null

    PUT /update_user
        body:
            {
                "userId": "string",     (required)
                "email": "string",
                "password": "string",
                "name": "string",
                "major": "string"
            }
        returns null if successful, else returns "INVALID_EMAIL" or "PASSWORD TO SHORT"
    
    DELETE /delete_user?userId=userId
        returns null if successful, else returns "User is not exits"

    POST /create_class
        body:
            {
                "teacherIds": [         (required)
                    "string"
                ],
                "className": "string",  (required)
                "majors": [             (required)
                    "string"
                ],
                "maxAttendance": 0
            }
        returns boolean if successful or not

    PUT /update_class
        body:
        {
            "classId": "string",        (required)
            "className": "string",
            "majors": [
                "string"
            ],
            "maxAttendance": 0
        }
        returns null

    DELETE /delete_class?classId=classId
        returns null

    GET /get_class?classId=classId
        returns class if successful, else null

    GET /get_classes?userId=userId
        returns list of classes where the user its in. If the user is a student than get an extra "attendance" field

    GET /get_class_students?classId=classId
        returns list of students who is in the class

    GET /join_to_class?studentId=studentId&classCode=classCode
        returns a boolean if successful or not

    POST /add_attendance
        body:
            {
                classId: "string"       (required)
                userIds: [              (required)
                    "userId1",
                    "userId2", ...
                ]
            }
        returns a boolean if successful or not