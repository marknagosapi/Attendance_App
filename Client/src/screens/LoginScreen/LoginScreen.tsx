import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './LoginScreenStyle'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>
}

function LoginScreen(props: LoginScreenProps){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log(username);
    console.log(password);
    if(username == 'admin' && password == 'admin'){
      console.log("OK")
      props.navigation.replace('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { props.navigation.navigate("Register"); console.log("Opened Login Screen")} }>
        <Text style={styles.registerLink}>Don't have an account? <Text style={styles.registerLinkText}>Register here</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
