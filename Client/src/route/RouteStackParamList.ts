type ProfessorRootStackParamList = {
  ClassDetailScreen: {
    className: string;
    classCode: string;
    classId: string;
  };

  HomeScreen: {};

  CameraScreen: {classId: string};

  ProfileDetailScreen: {};

  ResultScreen: {};

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
