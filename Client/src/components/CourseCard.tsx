import Colors from "@/constants/Colors";
import { BACKEND_URL } from "@/Utils/placeholders";
import React, { useEffect , useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CourseCardProps {
  courseData: StudentClassData;
  onPressed: (currentClass: StudentClassData) => void;
}
const CourseCard: React.FC<CourseCardProps> = (props: CourseCardProps) => {
  const currentClass = props.courseData;
  const [professorName, setProfessorName] = useState<string>("")

  const getProfessorName = async (userId: string) => {
    await fetch(BACKEND_URL + "/get_user?userId=" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfessorName(data.userName)
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  useEffect(()=>{

    getProfessorName(currentClass.teacherId);

  })

  
  const handlePressOnClass = () => {
    props.onPressed(currentClass);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePressOnClass}>
      <View style={styles.leftContent}>
        <Text style={styles.name}>{currentClass.className}</Text>
        <Text style={styles.info}>Lecturer: {professorName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange left content and delete button horizontally
    alignItems: "center",
    justifyContent: "space-between", // Push items to the left and right edges
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  leftContent: {
    flex: 1, // Expand to take all available space on the left
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info:{
    fontSize: 18,

    color:Colors.subtleInfoColor
  }
  //   major: {
  //     fontSize: 16,
  //   },
  //   attendanceRequired: {
  //     fontSize: 14,
  //   },
});

export default CourseCard;
