import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },

      image: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',

      },

    takeAttendanceText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:14,
        color: '#fff'
    },

    noPermissionContainer:{
        flex: 1,
        justifyContent: 'center', // Vertical center
        alignItems: 'center',     // Horizontal center
  
    },
 
    noPermissionText:{
        justifyContent:'center',
        alignItems:'center',
        fontWeight: 'bold',
        fontSize:20,
        color: 'red'
    },

    retakeButton:{
        

        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    
    takeAttendanceButton: {
        width: 200,
        height: 100,
        alignItems: 'center',
        marginTop: 350,
        borderRadius: Sizes.defaultBorderRadius,
        backgroundColor: Colors.usedGreenColor
    }
});