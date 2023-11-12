// ProfileDetailScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Header from "@/components/Header";
import { styles } from "./ProfileDetailScreenStyle";
import CustomButton from "@/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@/Utils/placeholders";

const ProfileDetailScreen = () => {
  const userName = useSelector((state: RootState) => state.auth.userName);
  const [username, setUsername] = useState<string | null>(userName);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // redux data
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleSave = async () => {
    // save changes to the database
    // check if user did changed this field
    if (username != userName) {
      // upload new User Name
    }

    await uploadImage();
  };

  const uploadImage = async () => {
    if (!profilePicture) {
      return;
    }

    const imageFile = new FormData();
    imageFile.append("imageFile", {
      uri: profilePicture,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const response = await fetch(
        BACKEND_URL + "/learn_face?userId=" + userId,
        {
          method: "POST",
          body: imageFile,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = await response.json();
      console.log(result);
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
                  source={require("@/assets/images/profile_pic_placeholder.jpeg")}
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
            placeholder="Enter Current Password "
            secureTextEntry
            onChangeText={(text) => setOldPassword(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter New Password "
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View>
          <CustomButton
            title="Save Changes"
            onPress={handleSave}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
};
export default ProfileDetailScreen;
