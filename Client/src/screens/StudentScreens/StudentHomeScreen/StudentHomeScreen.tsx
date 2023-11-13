import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import Header from "@/components/Header";
import { styles, modalStyles } from "./StudentHomeScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StudentRootStackParamList } from "@/route/RouteStackParamList";
import CustomButton from "@/components/CustomButton";
import { userAvatarPlaceholder } from "@/Utils/placeholders";
import CourseCard from "@/components/CourseCard";

type StudentHomeScreenProps = {
  navigation: NativeStackNavigationProp<
    StudentRootStackParamList,
    "StudentHomeScreen"
  >;
};

const StudentHomeScreen = (props: StudentHomeScreenProps) => {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [classes, setclasses] = useState<CourseData[]>([]);

  const [className, setClassName] = useState("");
  // const [courseMajor, setcourseMajor] = useState("");
  // const [minimumcourseAttendance, setMinimumcourseAttendance] = useState(0);

  const idCounter = useRef(1);

  const toggleModal = () => {
    setClassName("");
    setModalVisible(!isModalVisible);
  };

  const onDeleteCourse = (idToDelete: number) => {
    // Use the filter method to create a new array with the course removed
    const updatedclasses = classes.filter(
      (courseItem) => courseItem.id !== idToDelete
    );

    // Update the state with the new list of classes
    setclasses(updatedclasses);
  };

  const handleAddCourse = () => {
    // Validation
    if (className == "") {
      // Handle validation error (e.g., display an error message)
      alert("Please fill in all required fields.");
      return;
    }
    //Create a new course object with the entered data
    const newCourse: CourseData = {
      id: idCounter.current,
      name: className,
    };

    idCounter.current++;
    // Add the new course to your data or state
    setclasses([...classes, newCourse]);

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
          placeholder="Enter Code"
          placeholderTextColor={'#888'}
          style={modalStyles.input}
          value={className}
          onChangeText={(text) => setClassName(text)}
        />
        <View style={modalStyles.buttonHolder}>
          <TouchableOpacity
            style={[modalStyles.button]}
            onPress={handleAddCourse}
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


  const handleCoursePress = (courseName: string) => {
    props.navigation.navigate("StudentClassDetailScreen", {courseName}); // id
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Home Screen"
        userAvatar={userAvatarPlaceholder}
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CourseCard
              courseData={item}
              onPressed={handleCoursePress}
              onDelete={onDeleteCourse}
            ></CourseCard>
          )}
        />
        <CustomButton title="Add Class" onPress={toggleModal} />
      </View>
    </View>
  );
};

export default StudentHomeScreen;
