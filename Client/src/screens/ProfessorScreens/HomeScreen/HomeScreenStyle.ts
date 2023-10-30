import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
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
  
  });

  export const modalStyles = StyleSheet.create({
    modalContainer: {
      flex: 1, // Fill the screen
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '80%', // Set the width of the modal content
      backgroundColor: '#2ECC71',
      padding: 20,
      borderRadius: Sizes.defaultBorderRadius
    },
    title: {
      fontSize: 22,
      alignSelf: "center",
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fff',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      color: 'black',
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#fff',
      padding:10,
      
      borderRadius: Sizes.defaultBorderRadius,
      marginBottom: 15,
      alignItems: 'center',
    },

    buttonHolder:{
      padding: 10,
      marginTop: 15,
    },
    buttonText: {
      color: '#2ECC71',
      fontWeight: 'bold',
    },
  });
  
  