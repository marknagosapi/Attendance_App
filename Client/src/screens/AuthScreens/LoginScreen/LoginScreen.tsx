import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./LoginScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/LoginSlice";
import { RootState } from "@/store/store";
import { showAlert } from "@/Utils/function";
import { BACKEND_URL } from "@/Utils/placeholders";

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

function LoginScreen(props: LoginScreenProps) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userType = useSelector((state: RootState) => state.auth.userType);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (email == "" || password == "") {
      showAlert("Missing Field Data!");
      return;
    }

    await onLogin();

    console.log(userId + "checked");
    if (userId != null) {
      if (userType == "teacher") {
        props.navigation.replace("HomeScreen");
      } else {
        props.navigation.replace("StudentHomeScreen");
      }
    } else {
      showAlert("This User Does Not Exist");
    }
  };

  const onLogin = async () => {
    const response = await fetch(BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      if (data) {
        dispatch(
          setUser({
            userId: data.id,
            userName: data.userName,
            userType: data.userType,
          })
        );
      } else {
        console.log("User Not Found!");
        // if login was unsuccessfull
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Register");
          console.log("Opened Register Screen");
        }}
      >
        <Text style={styles.registerLink}>
          Don't have an account?{" "}
          <Text style={styles.registerLinkText}>Register here</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
