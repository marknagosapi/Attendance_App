import React, { useEffect, useState } from "react";
import { View, Text, FlatList,ActivityIndicator } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";
import { styles } from "./ClassDetailScreenStyle";
import CustomButton from "@/components/CustomButton";
import StudentCard from "@/components/StudentCard";
import Header from "@/components/Header";
import { BACKEND_URL } from "@/Utils/placeholders";
import Colors from "@/constants/Colors";

type ClassDetailScreenRouteProp = RouteProp<
  ProfessorRootStackParamList,
  "ClassDetailScreen"
>;
type ClassDetailScreenNavigationProp = NativeStackNavigationProp<
  ProfessorRootStackParamList,
  "ClassDetailScreen"
>;

type Props = {
  route: ClassDetailScreenRouteProp;
  navigation: ClassDetailScreenNavigationProp;
};

const ClassDetailScreen: React.FC<Props> = (props) => {
  const { className, classCode, classId} = props.route.params; 

  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStudents = async () => {
    console.log(classId)
    await fetch(BACKEND_URL + "/get_class_students?classId=" + classId ,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false)
        setStudents(data)
      })
      .catch((error) => {
        setIsLoading(true)
        console.error("Error fetching classes:", error);
      });
  };

  useEffect(() => {

    // Get Class Students 
    getStudents()
 
  }, []);

  const handleTakeAttendance = () => {
    console.log("Professor Want's To Take Attendance");
    props.navigation.navigate("CameraScreen", {classId});
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={className} goesBack />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Class Code: {classCode}</Text>

        <Text style={styles.sectionTitle}>Students</Text>
        {isLoading ? (<View style={[styles.container]}>
        <ActivityIndicator size="large" color={Colors.usedGreenColor} />
      </View>):
      <FlatList
        data={students}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <StudentCard student={item} />}
      /> }
        

        <CustomButton title="Take Attendance" onPress={handleTakeAttendance} />
      </View>
    </View>
  );
};

export default ClassDetailScreen;
