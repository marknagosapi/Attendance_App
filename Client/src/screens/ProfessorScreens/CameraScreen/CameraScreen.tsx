import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import { styles } from "./CameraScreenStyle";
import CoolReloadButton from "@/components/ReloadButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";
import { BACKEND_URL } from "@/Utils/placeholders";
import { RouteProp } from "@react-navigation/native";


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

  const [image, setImage] = useState(null);
  const deviceOrientation = ScreenOrientation;

  useEffect(()=>{

    if(students.length>0){
      props.navigation.replace("ResultScreen", {studentList: students});
    }

  },[students])

  const getAttendance = async () => {
    const imageFile = new FormData();
    imageFile.append("imageFile", {
      uri: "https://www.shutterstock.com/shutterstock/photos/2085055825/display_1500/stock-photo-portrait-of-successful-group-of-business-people-at-modern-office-looking-at-camera-portrait-of-2085055825.jpg",
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
      .then((data) => {setStudents(data)})
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  let camera: Camera;

  function navigateBack() {
    console.log("Retake picture");
    setImage(null);
  }

  async function handleImage(){
    await getAttendance()
    console.log(students)
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
