import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';
import * as ScreenOrientation from 'expo-screen-orientation'
import {styles} from "./CameraScreenStyle"
import CoolReloadButton from '@/components/ReloadButton';

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const deviceOrientation = ScreenOrientation

  function navigateBack(){
      console.log('Retake picture')
      setImage(null);
  }

  function handleImage(){

    console.log(image);

  }

  useEffect(() => {

    async function changeOrientation() {
        if (!deviceOrientation.isLandscape) {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
      }

    async function cameraHandler(){
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');

    }
        changeOrientation();
        cameraHandler();
        
        return () => {
            // Reset to portrait when the component unmounts
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
  }, []);

  const takePicture = async () => {

        if(camera){
            const data = await camera.takePictureAsync(null)
            setImage(data.uri);
        }
    }

    // if user give no permission
  if (hasCameraPermission === false) {
    return (<View style={styles.noPermissionContainer}>
            <Text style={styles.noPermissionText}>Give Permission 4 Camera Usage</Text>
    </View>
    )
  }

  // is user gave permission for camera usage
  return (
    <View style={{ flex: 1 }}>
    {image && (
  
            <ImageBackground source={{uri: image}} style={styles.image}>

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
        ) || (
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type} ref={ref => setCamera(ref)} >
        <View
          style={styles.container}
        >
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
}