import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    classItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      padding: 10,
    },
    className: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    major: {
      fontSize: 16,
    },
    yourClassesText: {
        fontSize: 24, // Increased font size
        fontWeight: 'bold',
        marginBottom: 10,
      },
      addButton: {
        backgroundColor: Colors.usedGreenColor,
        padding: 10,
        borderRadius: Sizes.defaultBorderRadius,
        marginBottom: 20, // Spacing from the class list
        alignItems: 'center',
      },
      addButtonText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
      },
  });