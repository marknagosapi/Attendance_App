import React from "react";
import { View, Image } from "react-native";
import { styles } from "./SplashScreenStyle";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SplashScreenPros = {
  navigation: NativeStackNavigationProp<any>;
};
const SplashScreen = (props: SplashScreenPros) => {

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }

    if (status.didJustFinish) {
      props.navigation.replace("Register"); // Replace with the name of your main screen
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('@/assets/images/hand_logo.png')} // Change the path to your image file
        style={styles.image}
      />
      <Image
        source={require('@/assets/images/present_logo.png')} // Change the path to your image file

      /> */}
      <Video
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        source={require("@/assets/videos/animation.mp4")}
        style={styles.video}
        shouldPlay
      />
    </View>
  );
};

export default SplashScreen;
