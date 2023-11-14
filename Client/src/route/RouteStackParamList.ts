type ProfessorRootStackParamList = {

  ClassDetailScreen: {
    className: string
    classCode: string
    students: Student[]
  };

  HomeScreen:{
      
  };

  CameraScreen:{

  };

  ProfileDetailScreen:{

  };

  ResultScreen:{

  };

  // Define other screen params here
};



// Student Root

type StudentRootStackParamList = {

  StudentHomeScreen:{
      
  }

  
  StudentProfileScreen:{

  }

  StudentClassDetailScreen:{
    // classId: string;
  
  }

  // Define other screen params here
};

export { StudentRootStackParamList, ProfessorRootStackParamList };
