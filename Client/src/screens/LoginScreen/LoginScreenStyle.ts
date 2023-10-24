import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.grayBackgroundColor
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: 300,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 10,
      marginBottom: 20,
      padding: 10,
    },
    loginButton: {
      backgroundColor: Colors.usedGreenColor,
      borderRadius: Sizes.defaultBorderRadius,
      paddingVertical:12,
      paddingHorizontal: 50,
      marginBottom: 10,
      marginTop: 20,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    registerLink: {
      marginTop: 10,
      color: '#3498db',
      fontSize: 16,
    },
    registerLinkText: {
      fontWeight: 'bold',
    },
  });