
import Colors from "@/constants/Colors";
import React,{useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface StudentCardProps {
  student: Student;
  maxAttendance: number;
}

const StudentCard: React.FC<StudentCardProps> = ( {student, maxAttendance} ) => {

  console.log(student)
  const progress = (student.attendance/maxAttendance) * 100;
  const [progressColor, setProgressColor] = useState(Colors.usedGreenColor);
  const handleAnimationComplete = () => {
    setProgressColor("#00A36C");

    setTimeout(() => {
      setProgressColor(Colors.usedGreenColor);
    }, 200);
  };
 
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.studentName}>{student.userName}</Text>
        <Text style={styles.major}>Major: {student.major}</Text>
      </View>
      <View>
      <Text style={styles.attendance}>
          Attendance:
        </Text>
      </View>
      <View>
            <AnimatedCircularProgress
              size={80}
              width={8}
              fill={progress}
              tintColor={progressColor}
              backgroundColor="#3d5875"
              rotation={0} // Initial rotation angle
              lineCap="round"
              duration={1600} // Adjust the duration as needed
              onAnimationComplete={handleAnimationComplete}
            >
              {() => (
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.usedGreenColor,
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    {maxAttendance} / {student.attendance}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
    justifyContent:'space-between',
    alignItems: 'center',
    display:'flex',
    flexDirection: 'row'
  },
  studentName: {
    maxWidth: 150,
    fontSize: 20,
    fontWeight: "bold",
  },
  major: {
    fontSize: 18,
  },
  attendance: {
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default StudentCard;
