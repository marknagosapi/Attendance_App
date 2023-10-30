import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';


type HeaderProps = {

    title: string,
    userAvatar?: string,
    onPress?: () => void

}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={{ uri: props.userAvatar }} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.usedGreenColor,

  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.whiteColor
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Sizes.defaultBorderRadius,
    borderColor: Colors.whiteColor,
  }  
 
});

export default Header;
