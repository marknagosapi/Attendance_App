import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SplashScreenPros = {
    navigation: NavigationProp<any>
}
const SplashScreen = (props:SplashScreenPros) => {

    setTimeout(() => {
        props.navigation.navigate('Register');
    },4000)

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Present!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
export default SplashScreen;