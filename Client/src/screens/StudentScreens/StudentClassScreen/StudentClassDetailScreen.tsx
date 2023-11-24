import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import Header from "@/components/Header";
import { styles } from "./StudentClassDetailScreenStyle";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StudentRootStackParamList } from "@/route/RouteStackParamList";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Colors from "@/constants/Colors";


// import CircularProgress from 'react-native-circular-progress-indicator';

type StudentClassDetailScreenRouteProp = RouteProp<
  StudentRootStackParamList,
  "StudentClassDetailScreen"
>;
type StudentClassDetailScreenNavigationProp = NativeStackNavigationProp<
  StudentRootStackParamList,
  "StudentClassDetailScreen"
>;

type Props = {
  route: StudentClassDetailScreenRouteProp;
  navigation: StudentClassDetailScreenNavigationProp;
};

const StudentClassDetailScreen: React.FC<Props> = (props) => {
  const currentClass = props.route.params;


  const progress = (currentClass.classData.attendance / currentClass.classData.maxAttendance) * 100;
  const [progressColor, setProgressColor] = useState(Colors.usedGreenColor);
 
  


  const handleAnimationComplete = () => {
    setProgressColor("#00A36C");

    setTimeout(() => {
      setProgressColor(Colors.usedGreenColor);
    }, 200);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Back To Classes"} goesBack />
      <View style={styles.textContainer}>
        <Text style={styles.className}>{currentClass.classData.className}</Text>
        <Text style={styles.requiredAttendance}>
          Required attendance: {currentClass.classData.maxAttendance}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={{ fontSize: 30, padding: 20, fontWeight: "bold" }}>
          Your attendance:
        </Text>
        <AnimatedCircularProgress
          size={220}
          width={20}
          fill={progress}
          tintColor={progressColor}
          backgroundColor="#3d5875"
          rotation={0} // Initial rotation angle
          lineCap="round"
          duration={1200} // Adjust the duration as needed
          onAnimationComplete={handleAnimationComplete}
        >
          {() => (
            <View>
              <Text
                style={{
                  fontSize: 30,
                  color: Colors.usedGreenColor,
                  alignSelf: "center",
                  fontWeight: 'bold'
                }}
              >
                {currentClass.classData.maxAttendance} / {currentClass.classData.attendance}
              </Text>
              <Text style={{ fontSize: 16, color: "#bbb" }}>
                Classes Attended
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

export default StudentClassDetailScreen;
