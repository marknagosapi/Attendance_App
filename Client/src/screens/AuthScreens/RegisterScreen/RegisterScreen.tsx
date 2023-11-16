import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import { styles } from "./RegisterScreenStyle";
import SwitchSelector from "react-native-switch-selector";
import Colors from "@/constants/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { setRegistered } from "@/store/RegisterSlice";
import { RootState } from "@/store/store";
import { showAlert, isObject } from "@/Utils/function";
import { BACKEND_URL } from "@/Utils/placeholders";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};
const RegistrationScreen = (props: RegisterScreenProps) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("student");
  const [major, setSelectedMajor] = useState<string>("informatics");

  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.register.userId);
  const error = useSelector((state: RootState) => state.register.error);

  useEffect(() => {

    if(error != null){
      showAlert(error);
    }

    if (!userId) {
      return;
    }

    if (userType == "teacher") {
      console.log('teacher')
      props.navigation.replace("HomeScreen");
    } else {
      console.log('prof')
      props.navigation.replace("StudentHomeScreen");
    }

  }, [userId, error]);

  const onRegister = async () => {
    const response = await fetch(BACKEND_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, email, userType, major }),
    });
    if (response.status === 200) {
      const data = await response.json();
  
      if (isObject(data)) {
        console.log("Successfully registered!");
        dispatch(setRegistered({ userId: data.userId, error: null }));
      } else {
        console.log("Failed to register!");
        dispatch(setRegistered({ userId: null, error: data }));
      }
    }
  };

  const majors = [
    "Informatics",
    "Automatization",
    "Engineering",
    "Networking & Communication",
    "Mechanics",
  ];

  const onMajorChange = (major: string) => {
    setSelectedMajor(major.toLowerCase);
  };

  const handleRegistration = async () => {
    if (userName == "" || password == "" || email == "") {
      showAlert("Missing Field Data!");
      return;
    }

    await onRegister();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
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
      <View style={styles.switchContainer}>
        <SwitchSelector
          options={[
            { label: "Student", value: "student" },
            { label: "Teacher", value: "teacher" },
          ]}
          initial={0}
          buttonColor={Colors.usedGreenColor}
          textStyle={styles.switchText}
          selectedTextStyle={styles.selectedSwitchText}
          onPress={(value: string) => setUserType(value)}
        />

        {userType === "student" && (
          <React.Fragment>
            <Text style={styles.labelText}>Select a Major:</Text>

            <ModalDropdown
              options={majors}
              defaultValue={majors[0]}
              onSelect={onMajorChange}
              style={styles.dropdownButton}
              textStyle={styles.dropdownButtonText}
              dropdownStyle={styles.dropdownStyle}
              dropdownTextStyle={styles.dropdownItemText}
            />
          </React.Fragment>
        )}
      </View>

      <TouchableOpacity
        onPress={handleRegistration}
        style={styles.registerButton}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.replace("Login");
          console.log("Opened Login Screen");
        }}
      >
        <Text style={styles.loginLink}>
          Already have an account?
          <Text style={styles.loginLinkText}> Login here </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegistrationScreen;
