import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Sizes from '@/constants/Sizes';
import { userAvatarPlaceholder } from '@/Utils/placeholders';
import {RootState} from '@/store/store'
import { useSelector } from 'react-redux';

type HeaderProps = {

    title: string,
    userAvatar?: string,
    onPress?: () => void,
    goesBack?: boolean

}

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();


  return (
    <View style={styles.header}>
      <View style={styles.headerRowContainer}>
        {props.goesBack && <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backArrow}>{"<"}</Text></TouchableOpacity>}
        <Text style={styles.title}>{props.title}</Text>
      </View>
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
    maxWidth: 400,
    color: Colors.whiteColor
  },

  headerRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  
  },

  backArrow:{
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
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
