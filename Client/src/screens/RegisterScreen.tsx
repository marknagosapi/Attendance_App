import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp} from '@react-navigation/native';
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
        onPress={(value) => setSelectedRole(value)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  switchContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 30,
    marginTop:0
  },
 
  registerButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 15,
    paddingVertical:12,
    paddingHorizontal: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  switchText: {
    fontSize: 16,
    color: '#555',
  },
  selectedSwitchText: {
    fontSize: 16,
    color: 'white',
  },
  loginLink: {
    marginTop: 10,
    color: '#3498db',
    fontSize: 16,
  },
  loginLinkText: {
   fontWeight: 'bold',
  },
});

export default RegistrationScreen;
