import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity } from 'react-native';
import { NavigationProp} from '@react-navigation/native';
import {styles} from './RegisterScreenStyle'
import SwitchSelector from 'react-native-switch-selector';

type RegisterScreenProps = {
  navigation: NavigationProp<any>
}


const RegistrationScreen = (props: RegisterScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');


  const handleRegistration = () => {
    // Add your registration logic here
    console.log('Username: ' + username);
    console.log('Password: ' + password);
    console.log('Email: ' + email);
    console.log("Role:" + selectedRole);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.switchContainer}>
      <SwitchSelector
        options={[
          { label: 'Student', value: 'student' },
          { label: 'Teacher', value: 'teacher' },
        ]}
        initial={0}
        buttonColor="#2ECC71"
        textStyle={styles.switchText}
        selectedTextStyle={styles.selectedSwitchText}
        onPress={(value: string) => setSelectedRole(value)}
      />
      </View>
      <TouchableOpacity onPress={handleRegistration} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>  {props.navigation.navigate("Login"); console.log("Opened Login Screen")}}>
        <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginLinkText}> Login here </Text></Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegistrationScreen;
