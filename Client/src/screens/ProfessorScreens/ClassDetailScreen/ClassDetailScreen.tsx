import React from "react";
import { View, Text, FlatList} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";
import { styles } from "./ClassDetailScreenStyle";
import CustomButton from "@/components/CustomButton";
import StudentCard from "@/components/StudentCard";
import Header from "@/components/Header";

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
  const { className, students } = props.route.params; // Get class details and students from navigation params

  const handleTakeAttendance = () => {
    console.log("Professor Want's To Take Attendance");
    props.navigation.navigate("CameraScreen", {});
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={className} goesBack />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Students</Text>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StudentCard student={item} />}
        />

        <CustomButton title="Take Attendance" onPress={handleTakeAttendance} />
      </View>
    </View>
  );
};

export default ClassDetailScreen;
