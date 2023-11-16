import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.studentName}>{student.userName}</Text>
      <Text style={styles.major}>Major: {student.major}</Text>
      <Text style={styles.attendance}>
        Attendance: {student.attendance} times
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  major: {
    fontSize: 16,
  },
  attendance: {
    fontSize: 16,
  },
});

export default StudentCard;
