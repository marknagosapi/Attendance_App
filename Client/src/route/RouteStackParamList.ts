type ProfessorRootStackParamList = {

  SplashScreen:{

  },
  ClassDetailScreen: {
    className: string;
    classCode: string;
    classId: string;
    maxAttendance: number;
  };

  HomeScreen: {};

  CameraScreen: { classId: string };

  ProfileDetailScreen: {};

  ResultScreen: {
    studentList: PresentStudent[];
    classId: string;
  };

  // Define other screen params here
};

// Student Root

type StudentRootStackParamList = {
  StudentHomeScreen: {};

  StudentProfileScreen: {};

  StudentClassDetailScreen: {
    classData: StudentClassData;
  };

  // Define other screen params here
};

export { StudentRootStackParamList, ProfessorRootStackParamList };
