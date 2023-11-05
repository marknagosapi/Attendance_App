import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor
  },
  video: {
    width: '100%',
    marginTop: 100,
    alignSelf: 'center',
    aspectRatio: 9/16
  },
});