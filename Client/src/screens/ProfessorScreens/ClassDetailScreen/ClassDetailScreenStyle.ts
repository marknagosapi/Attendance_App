import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  className: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  studentItem: {
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

  takeAttendanceButton: {
    backgroundColor: Colors.usedGreenColor,
    padding: 10,
    borderRadius: Sizes.defaultBorderRadius,
    marginBottom: 20, // Spacing from the class list
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
