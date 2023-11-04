// ProfileDetailScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import {styles} from './ProfileDetailScreenStyle'
import CustomButton from '@/components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

const ProfileDetailScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleSave = () => {


    
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  return (
    <View style={{flex:1}}>
        <Header title="Profile Details" goesBack />
        <View style={styles.container}>
        <View>
        <Text style={styles.sectionTitle}>Edit Profile</Text>
        <View style={styles.addNewProfileHolder}>
          <TouchableOpacity style={styles.profilePicture} onPress={handleImagePicker}>
              {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.profileImage} />
              ) : (
              <Image source={require("@/assets/images/profile_pic_placeholder.jpeg")} style={styles.placeHolderImage}/>
              )}
          </TouchableOpacity>
          <View style={styles.profileImageInfoContainer}>
            <Text style={styles.addNewProfileText}>Profile Picture</Text>
            <Text style={styles.subtleInfo}>Click To Change</Text>
          </View>
 
        </View>
        <Text style={styles.addNewProfileText} >Username:</Text>
        <TextInput
            style={styles.input}
            placeholder="Current Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
        />
                <Text style={styles.addNewProfileText} >Password:</Text>
        <TextInput
            style={styles.input}
            placeholder="Current Password "
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        </View>
        <View>
          <CustomButton title="Save Changes" onPress={handleSave}></CustomButton>
         </View>
        </View>
    </View>
  ); 
};
export default ProfileDetailScreen;
