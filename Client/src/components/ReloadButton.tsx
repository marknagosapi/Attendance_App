import React, { useRef } from 'react';
import {TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type reloadButtonProps = {
  buttonFunction : Function
}

function ReloadButton(props: reloadButtonProps){
  const rotationValue = useRef(new Animated.Value(0)).current;

  const rotate = () => {
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const handleRetake = () => {
       props.buttonFunction();
  };

  const spin = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableOpacity onPress={handleRetake} style={styles.retakeButton}>
      <Animated.View style={[styles.icon, { transform: [{ rotate: spin }] }]}>
        <AntDesign name="retweet" size={34} color="white" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  retakeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 34,
    height: 34,
  },
});

export default ReloadButton