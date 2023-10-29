// ProfileDetailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import Header from '@/components/Header';
import {styles} from './ProfileDetailScreenStyle'
const ProfileDetailScreen = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [password, setPassword] = useState('********');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSave = () => {
    // Implement saving changes to the user's profile
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleImagePicker = () => {
    // Implement image picker functionality to select a profile picture
    // You can use libraries like 'react-native-image-picker' or 'react-native-image-crop-picker' for this.
    // For simplicity, we'll just set a placeholder profile picture here.
  };

  return (
    <View style={{flex:1}}>
        <Header title="Profile Details" />
        <View style={styles.container}>
        <Text style={styles.sectionTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.profilePicture} onPress={handleImagePicker}>
            {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
            ) : (
            <Text>Tap to Add Profile Picture</Text>
            )}
        </TouchableOpacity>
        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        <Button title="Save Changes" onPress={handleSave} />
        </View>
    </View>
  );
  
};

export default ProfileDetailScreen;
