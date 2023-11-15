import React from "react";
import { View } from "react-native";
import { styles } from "./SplashScreenStyle";
import { AVPlaybackStatus, Video } from "expo-av";
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
