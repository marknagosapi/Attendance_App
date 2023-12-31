// ProfileDetailScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import { styles } from "./ProfileDetailScreenStyle";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { RootState } from "@/store/store";
import { BACKEND_URL } from "@/Utils/placeholders";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/LoginSlice";
import { Alert } from "react-native";
import Strings from "@/constants/Strings";

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<
    ProfessorRootStackParamList,
    "ProfileDetailScreen"
  >;
};
const ProfileDetailScreen = (props: ProfileScreenProps) => {
  const dispatch = useDispatch();
  const userName = useSelector((state: RootState) => state.auth.userName);
  const userAvatar = useSelector((state: RootState) => state.auth.userAvatar);
  const userType = useSelector((state: RootState) => state.auth.userType);
  const [username, setUsername] = useState<string | null>(userName);
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | undefined| null>(null);

  // redux data
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(()=>{

    setProfilePicture(userAvatar)

  },[])

  const deleteUser = async () => {
    console.log("DELETING USER...");
    await fetch(BACKEND_URL + "/delete_user?userId=" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("USER DELETED!");
        dispatch(
          setUser({
            userId: null,
            userName: null,
            userType: null,
            userAvatar: undefined,
          })
        );
        props.navigation.replace("SplashScreen", {});
      })
      .catch((error) => {
        console.error("Error Deleting User:", error);
      });
  };

  const updateUser = async () => {
    const newUser = {
      userId: userId,
      email: null,
      password: null,
      name: username,
      major: null,
    };

    await fetch(BACKEND_URL + "/update_user", {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error Updating User:", error);
      });
  };

  const updatePassword = async () => {
    const newUser = {
      userId: userId,
      email: null,
      password: password,
      name: null,
      major: null,
    };

    await fetch(BACKEND_URL + "/update_user", {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error Updating User:", error);
      });
  };

  const handleSave = async () => {
    if (username != userName) {
      await updateUser();
      dispatch(setUser({userId:userId,userName: username,userType: userType, userAvatar: userAvatar}))
      console.log("User Name Changed");
    }

    if (password != "") {
      await updatePassword();
      console.log("Update Password!");
      setPassword("");
    }

    if (profilePicture != null) {
      await uploadImage();
      dispatch(setUser({userId:userId,userName: username,userType: userType, userAvatar: profilePicture}))
      console.log("New Image Uploaded");
    }
    Alert.alert("UPDATE", "USER SUCCESSFULLY UPDATED!");
  };

  const uploadImage = async () => {
    if (!profilePicture) {
      return;
    }

    const imageFile = new FormData();
    const fileName = profilePicture.split("/").pop() || "image.jpg";

    imageFile.append("imageFile", {
      uri: profilePicture,
      type: "image/jpeg",
      name: fileName,
    });

    try {
      const response = await fetch(
        BACKEND_URL + "/learn_face?userId=" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: imageFile,
        }
      );

      const result = await response.json();
      console.log("Image upload result:", result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
    <View style={{ flex: 1 }}>
      <Header title="Profile Details" goesBack />
      <View style={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
          <View style={styles.addNewProfileHolder}>
            <TouchableOpacity
              style={styles.profilePicture}
              onPress={handleImagePicker}
            >
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={{
                    uri: userAvatar,
                  }}
                  style={styles.placeHolderImage}
                />
              )}
            </TouchableOpacity>
            <View style={styles.profileImageInfoContainer}>
              <Text style={styles.infoTitle}>Profile Picture</Text>
              <Text style={styles.subtleInfo}>Click To Change</Text>
            </View>
          </View>
          <Text style={styles.subSectionTitle}>Change Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Current Username"
            value={username ? username : ""}
            onChangeText={(text) => setUsername(text)}
          />

          <Text style={styles.subSectionTitle}>Change Password:</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter New Password "
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.subtleInfo}>{Strings.passwordCaution}</Text>
        </View>

        <View>
          <CustomButton
            title="Save Changes"
            onPress={handleSave}
          ></CustomButton>
          <TouchableOpacity onPress={deleteUser}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ProfileDetailScreen;
