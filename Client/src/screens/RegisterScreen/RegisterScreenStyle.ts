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
    switchContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 30,
      marginTop:0
    },
   
    registerButton: {
      backgroundColor: Colors.usedGreenColor,
      borderRadius: Sizes.defaultBorderRadius,
      paddingVertical:12,
      paddingHorizontal: 50,
      marginBottom: 10,
      marginTop: 20,
    },
    registerButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
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
    switchText: {
      fontSize: 16,
      color: '#555',
    },
    selectedSwitchText: {
      fontSize: 16,
      color: 'white',
    },
    loginLink: {
      marginTop: 10,
      color: '#3498db',
      fontSize: 16,
    },
    loginLinkText: {
     fontWeight: 'bold',
    },
  });