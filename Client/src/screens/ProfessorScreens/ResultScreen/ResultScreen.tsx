// ResultScreen.tsx
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";

import { styles } from "./ResultScreenStyle";

type ResultScreenRouteProp = RouteProp<
  ProfessorRootStackParamList,
  "ResultScreen"
>;

type ResultScreenProps = {
  navigation: NativeStackNavigationProp<
    ProfessorRootStackParamList,
    "ResultScreen"
  >;
  route: ResultScreenRouteProp;
};

const ResultScreen = (props: ResultScreenProps) => {
  const [students, setStudents] = useState<PresentStudent[]>([]);
  const [change,setChanged] = useState<boolean>(false)

  useEffect(() => {
    if(!change){
      setStudents(props.route.params.studentList);
    }
  });

  const toggleAttendance= (studentId: string) => {
    console.log(students)
    setStudents((prevStudents) => {
      return prevStudents.map((student) =>
        student.userId === studentId ? { ...student, isPresent: !student.isPresent } : student
      );
    });
    setChanged(true)
  };

  const getStatusText = (present: boolean) => (present ? "Present" : "Absent");

  const saveResults = () => {
    // Process the attendance data here (e.g., send it to an API, save it to storage, etc.)
    console.log("Attendance data:", students);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Result Screen"></Header>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Student Names</Text>
          <Text style={styles.headerText}>Presence</Text>
        </View>

        <FlatList
          data={students}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <View style={styles.studentRow}>
              <Text style={styles.studentName}>{item.userName}</Text>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: item.isPresent ? "green" : "red" },
                  ]}
                  onTouchEnd={() => toggleAttendance(item.userId)}
                />
                <Text style={styles.statusText}>
                  {getStatusText(item.isPresent)}
                </Text>
              </View>
            </View>
          )}
        />

        <CustomButton title="Save Results" onPress={saveResults} />
      </View>
    </View>
  );
};

export default ResultScreen;
