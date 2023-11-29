import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import { styles } from "./CameraScreenStyle";
import CoolReloadButton from "@/components/ReloadButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";
import { BACKEND_URL } from "@/Utils/placeholders";
import { RouteProp } from "@react-navigation/native";
import Colors from "@/constants/Colors";

type CameraScreenRouteProp = RouteProp<
  ProfessorRootStackParamList,
  "CameraScreen"
>;

type CameraScreenProps = {
  navigation: NativeStackNavigationProp<
    ProfessorRootStackParamList,
    "CameraScreen"
  >;
  route: CameraScreenRouteProp;
};

const CameraScreen = (props: CameraScreenProps) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(false);

  const camareRef = useRef(null);
  const classId = props.route.params.classId;
  const [students, setStudents] = useState<PresentStudent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);
  const deviceOrientation = ScreenOrientation;

  useEffect(() => {
    if (students.length > 0) {
      props.navigation.replace("ResultScreen", {
        studentList: students,
        classId: classId,
      });
    }
  }, [students]);

  const getAttendance = async () => {
 
    // req
    const imageFile = new FormData();
    imageFile.append("imageFile", {
      uri: "https://media.istockphoto.com/id/1346125184/photo/group-of-successful-multiethnic-business-team.jpg?b=1&s=612x612&w=0&k=20&c=bnPzFSe0OyDihobiURlo5COABCMY2tMP3dg56EMkizc=",
      type: "image/jpeg",
      name: "image.jpg",
    });

    await fetch(BACKEND_URL + "/check?classId=" + classId, {
      method: "POST",
      body: imageFile,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  let camera: Camera;

  function navigateBack() {
    console.log("Retake picture");
    setImage(null);
  }

  async function handleImage() {
    setIsLoading(true);
    await getAttendance();
    setIsLoading(false);
 
  }

  useEffect(() => {
    async function changeOrientation() {
      if (!deviceOrientation.isLandscape) {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      }
    }

    async function cameraHandler() {
      console.log("Asking for Camera Persmission...");
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const access = cameraStatus.status === "granted";
      setHasCameraPermission(access);

      if (cameraStatus.status === "granted") {
        console.log("Camera Permissions granted");
      }
    }

    changeOrientation();
    cameraHandler();

    return () => {
      // Reset to portrait when the component unmounts
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, []);

  const takePicture = async () => {
    if (camareRef.current) {
      const data = await camareRef.current.takePictureAsync();
      setImage(data.uri);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container]}>
        <Text style={{ padding: 20, fontSize: 25, fontWeight: 'bold' }}>Processing Image...</Text>
        <ActivityIndicator size="large" color={Colors.usedGreenColor} />
      </View>
    );
  }

  // if user give no permission
  if (hasCameraPermission === false) {
    return (
      <View style={styles.noPermissionContainer}>
        <Text style={styles.noPermissionText}>
          Give Permission 4 Camera Usage
        </Text>
        <Button
          title="Request Camera Permission"
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === "granted");
          }}
        />
      </View>
    );
  }


  // is user gave permission for camera usage
  return (
    <View style={{ flex: 1 }}>
      {(image && (
        <ImageBackground source={{ uri: image }} style={styles.image}>
          <View style={styles.retakeButton}>
            <CoolReloadButton buttonFunction={navigateBack}></CoolReloadButton>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.takeAttendanceButton}
              onPress={handleImage}
            >
              <Text style={styles.takeAttendanceText}>SEND</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )) || (
        <Camera style={{ flex: 1 }} type={CameraType.back} ref={camareRef}>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.takeAttendanceButton}
              onPress={takePicture}
            >
              <Text style={styles.takeAttendanceText}>Take Attendance</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default CameraScreen;
