import React, { useEffect, useState, useCallback } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import Header from "@/components/Header";
import { styles, modalStyles } from "./StudentHomeScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StudentRootStackParamList } from "@/route/RouteStackParamList";
import CustomButton from "@/components/CustomButton";
import { BACKEND_URL, userAvatarPlaceholder } from "@/Utils/placeholders";
import CourseCard from "@/components/CourseCard";
import Colors from "@/constants/Colors";
import { showAlert } from "@/Utils/function";
import { ScrollView } from 'react-native-gesture-handler';

type StudentHomeScreenProps = {
  navigation: NativeStackNavigationProp<
    StudentRootStackParamList,
    "StudentHomeScreen"
  >;
};

const StudentHomeScreen = (props: StudentHomeScreenProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [classes, setClasses] = useState<StudentClassData[]>([]);

  const [classCode, setClassCode] = useState("");
  const [loadingClasses, setLoadingClassess] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  const studentId = useSelector((state: RootState) => state.auth.userId);
  const userAvatar = useSelector((state: RootState) => state.auth.userAvatar);

  const refresh = () => {
    // Call this function to re-fetch the data
    setRefreshData((prevRefreshData) => !prevRefreshData); // Toggles the refreshData state
  };

  useEffect(() => {
    getClasses();
  }, [refreshData]);

  // Function to get classes by teacherIds
  const getClasses = async () => {
    await fetch(BACKEND_URL + "/get_classes?userId=" + studentId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
        setLoadingClassess(false);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  const toggleModal = () => {
    setClassCode("");
    setModalVisible(!isModalVisible);
  };

  const joinClassByClassCode = async () => {
    await fetch(
      BACKEND_URL +
        "/join_to_class?studentId=" +
        studentId +
        "&classCode=" +
        classCode,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoadingClassess(false);
        refresh();
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setLoadingClassess(true);
      });
  };

  const handleAddClass = async () => {
    // Validation
    if (classCode == "") {
      // Handle validation error (e.g., display an error message)
      showAlert("Please fill in all required fields.");
      return;
    }

    // Add New Class By ClassCode

    await joinClassByClassCode();

    // Clear the input fields and close the modal
    toggleModal();
  };

  function onAvatarPress() {
    console.log("Student Entered Edit Profile Screen");
    props.navigation.navigate("StudentProfileScreen", {});
  }

  // the modal
  const modalContent = (
    <View style={[modalStyles.modalContainer]}>
      <View style={modalStyles.modalContent}>
        <Text style={modalStyles.title}>Join Class</Text>
        <TextInput
          placeholder="Enter Class Code"
          placeholderTextColor={"#888"}
          style={modalStyles.input}
          value={classCode}
          onChangeText={(text) => setClassCode(text)}
        />
        <View style={modalStyles.buttonHolder}>
          <TouchableOpacity
            style={[modalStyles.button]}
            onPress={handleAddClass}
          >
            <Text style={modalStyles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[modalStyles.button]} onPress={toggleModal}>
            <Text style={modalStyles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleCoursePress = (classData: StudentClassData) => {
    props.navigation.navigate("StudentClassDetailScreen", { classData }); // id
  };

  const [isRefreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  
    getClasses();
  
    setRefreshing(false);
  }, []);

  if (loadingClasses) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={Colors.usedGreenColor} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Home Screen"
        userAvatar={userAvatar}
        onPress={onAvatarPress}
      ></Header>
      <View style={styles.container}>
        <Modal
          style={{ flex: 1 }}
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          {modalContent}
        </Modal>

        <Text style={styles.yourClassesText}>Your Classes</Text>
        <FlatList
          data={classes}
          keyExtractor={(item) => item.classId}
          renderItem={({ item }) => (
            <CourseCard
              courseData={item}
              onPressed={handleCoursePress}
            ></CourseCard>
          )}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}
 />
          }
        />
        <CustomButton title="Join Class" onPress={toggleModal} />
      </View>
    </View>
  );
};

export default StudentHomeScreen;
