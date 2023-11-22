// ResultScreen.tsx
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";

import { styles } from "./ResultScreenStyle";
import { BACKEND_URL } from "@/Utils/placeholders";

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
  const [change, setChanged] = useState<boolean>(false);

  useEffect(() => {
    if (!change) {
      setStudents(props.route.params.studentList);
    }
  });

  const toggleAttendance = (studentId: string) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) =>
        student.userId === studentId
          ? { ...student, isPresent: !student.isPresent }
          : student
      );
    });
    setChanged(true);
  };

  const getStatusText = (present: boolean) => (present ? "Present" : "Absent");
  const classId = props.route.params.classId;

  const addAttendance = async () => {
    const userIds = students
      .filter((student) => student.isPresent == true)
      .map((student) => student.userId);
    const classId = props.route.params.classId;
    const postBody = { classId, userIds };

    console.log(postBody)

    await fetch(BACKEND_URL + "/add_attendance", {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error Updating Attendance:", error);
      });
  };
  const saveResults = async () => {
    addAttendance();
    props.navigation.replace("HomeScreen",{});
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
