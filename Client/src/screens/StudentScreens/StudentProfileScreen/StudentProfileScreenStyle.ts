import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
    },
    profilePicture: {
      alignItems: 'center',
      padding: 10,
      justifyContent: 'center',
      width: 120,
      height: 120,
      borderRadius: Sizes.defaultBorderRadius * 2.5,
      borderWidth: 3,
      borderColor: Colors.usedGreenColor,
      marginVertical: 20,
    },
    
    profileImage: {
      width: 98,
      height: 98,
      borderRadius: 49,
    },
   
    input: {
      height: 40,
      color: 'black',
      borderColor: Colors.usedGreenColor,
      borderWidth: 2,
      marginBottom: 20,
      borderRadius: Sizes.defaultBorderRadius / 1.5,
      paddingHorizontal: 10,
    },
  });