type ProfessorRootStackParamList = {

  ClassDetailScreen: {
    className: string;
    students: Student[];
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

  CourseDetailScreen:{
    courseName: string;
  }

  // Define other screen params here
};

export { StudentRootStackParamList, ProfessorRootStackParamList };
