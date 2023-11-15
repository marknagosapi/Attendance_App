import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  textContainer: {
    // position: 'absolute',
    maxWidth: '80%',
    top: 20,
    left: 20,
  },
  className: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 2
  },
  requiredAttendance: {
    fontSize: 20,
    marginTop: 5,
    padding: 2
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

