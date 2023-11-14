import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { ResizeMode } from "expo-av";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      marginBottom: 10,
      flexDirection: "column",
      justifyContent: 'space-between',
      
    },
    sectionTitle: {
      fontSize: 25,
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
      borderWidth: 4,
      borderColor: Colors.usedGreenColor,
      marginVertical: 20,
    
    },
    
    profileImage: {
      width: 113,
      height: 113,
      borderRadius: Sizes.defaultBorderRadius * 2.5
    },

    placeHolderImage:{
      width: 113,
      height: 113,
      resizeMode: ResizeMode.COVER,
      borderRadius: Sizes.defaultBorderRadius * 2.5
    },
   
    profileImageInfoContainer: {
        flexDirection: 'column',
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

    addNewProfileHolder:{
      flexDirection:'row', 
      alignItems:'center'
    },

    addNewProfileText:{
      paddingHorizontal: 10,
      fontWeight: 'bold',
      fontSize: 20,
    },

    subtleInfo:{
      paddingHorizontal: 10,
      color: Colors.subtleInfoColor
    },
  });