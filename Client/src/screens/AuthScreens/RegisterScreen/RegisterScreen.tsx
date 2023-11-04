import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { styles } from "./RegisterScreenStyle"
import SwitchSelector from "react-native-switch-selector"
import Colors from "@/constants/Colors"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useDispatch, useSelector } from "react-redux"
import { setRegistered } from "@/store/RegisterSlice"
import { RootState } from "@/store/store"
import { showAlert } from "@/Utils/function"
import {BACKEND_URL} from '@/Utils/placeholders'

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<any>
}

const RegistrationScreen = (props: RegisterScreenProps) => {
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState("student")

  const dispatch = useDispatch()

  const isRegistered = useSelector(
    (state: RootState) => state.register.isRegistered
  )

  const onRegister = async () => {
    const response = await fetch(BACKEND_URL+"/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, email, userType }),
    })
    if (response.status === 200) {
      const data = await response.json()
      if (data) {
        dispatch(setRegistered({ isRegistered: true }))
      } else {
        dispatch(setRegistered({ isRegistered: false }))
      }
    }
  }

  const handleRegistration = () => {
    if (userName == "" || password == "" || email == "") {
      showAlert("Missing Field Data!")
      return
    }
    onRegister()
    if (isRegistered) props.navigation.navigate("Login")
    else showAlert("Could Not Register!")
  }

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
      </View>

      <TouchableOpacity
        onPress={handleRegistration}
        style={styles.registerButton}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.replace("Login")
          console.log("Opened Login Screen")
        }}
      >
        <Text style={styles.loginLink}>
          Already have an account?
          <Text style={styles.loginLinkText}> Login here </Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default RegistrationScreen
