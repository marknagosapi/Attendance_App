import { NavigationProp } from '@react-navigation/native'
import React from 'react'
import { View, Text} from 'react-native'
import {styles} from './SplashScreenStyle'

type SplashScreenPros = {
    navigation: NavigationProp<any>
}
const SplashScreen = (props:SplashScreenPros) => {

    setTimeout(() => {
        props.navigation.navigate('Register')
    },4000)

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Present!</Text>
    </View>
  );
};

export default SplashScreen;