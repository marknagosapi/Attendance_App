import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
   
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.usedGreenColor
  },
  headerText: { fontWeight: "bold", fontSize: 25 },

  studentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  studentName: { fontSize: 22 },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 28,
    height: 28,
    borderRadius: Sizes.defaultBorderRadius,
    marginRight: 10,
  },
  statusText: { fontSize: 20 },
});
