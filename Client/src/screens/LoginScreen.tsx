import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type LoginScreenProps = {
  navigation: NavigationProp<any>
}

function LoginScreen(props: LoginScreenProps){
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
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
  loginButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 15,
    paddingVertical:12,
    paddingHorizontal: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 10,
    color: '#3498db',
    fontSize: 16,
  },
  registerLinkText: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
