import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator} from "react-native";
import { styles } from "./LoginScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/LoginSlice";
import { RootState } from "@/store/store";
import { showAlert } from "@/Utils/function";
import { BACKEND_URL } from "@/Utils/placeholders";
import { isObject } from "@/Utils/function";
import Colors from "@/constants/Colors";


type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

function LoginScreen(props: LoginScreenProps) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const userType = useSelector((state: RootState) => state.auth.userType);
  const userName = useSelector((state: RootState) => state.auth.userName);
  const userAvatar = useSelector((state: RootState) => state.auth.userAvatar);
  const [isLoading, setIsLoading] = useState(false);

  const [notificationToken, setNotificationToken] = useState("");

  useEffect(() => {
    if (!userId) {
      // register for push notification
      return;
    }
   
    dispatch(setUser({
      userId: userId,
      userName: userName,
      userType: userType,
      userAvatar: BACKEND_URL + '/get_face?userId=' + userId
    }))

    console.log(userAvatar)
    
    if (userType == "teacher") {
      props.navigation.replace("HomeScreen");
    } else {
      props.navigation.replace("StudentHomeScreen");
    }
  }, [userId]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (email == "" || password == "") {
      showAlert("Missing Field Data!");
      return;
    }
    await onLogin();
    setIsLoading(false)
  };

  const onLogin = async () => {
    setIsLoading(true)
    const response = await fetch(BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, notificationToken }),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
      if (isObject(data)) {
        dispatch(
          setUser({
            userId: data.id,
            userName: data.userName,
            userType: data.userType,
            userAvatar: BACKEND_URL + '/get_face?userId=' + "placeHolder"
          })
        );

        return true;
      } else {
        showAlert("This User Does Not Exist");
        
        return false;
      }
    }
  };

  if (isLoading) {
  return(
      <View style={[styles.container]}>
        <Text style={{padding:20, fontSize: 20}}>Logging in...</Text>
        <ActivityIndicator size="large" color={Colors.usedGreenColor} />
     </View>
  )
  }
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
