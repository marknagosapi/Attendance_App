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
import { styles, modalStyles } from "./HomeScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";
import CustomButton from "@/components/CustomButton";
import { generateRandomStudent } from "@/Utils/function";
import { userAvatar } from "@/Utils/placeholders";
import ClassCard from "@/components/ClassCard";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<
    ProfessorRootStackParamList,
    "HomeScreen"
  >;
};

const HomeScreen = (props: HomeScreenProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);

  const [className, setClassName] = useState("");
  const [classMajor, setClassMajor] = useState("");
  const [minimumClassAttendance, setMinimumClassAttendance] = useState(0);

  const idCounter = useRef(1);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onDeleteClass = (idToDelete: number) => {
    // Use the filter method to create a new array with the class removed
    const updatedClasses = classes.filter(
      (classItem) => classItem.id !== idToDelete
    );

    // Update the state with the new list of classes
    setClasses(updatedClasses);
  };

  const handleAddClass = () => {
    console.log(className, classMajor, minimumClassAttendance);
    // Validation
    if (className == "" || classMajor == "" || isNaN(minimumClassAttendance)) {
      // Handle validation error (e.g., display an error message)
      alert("Please fill in all required fields.");
      return;
    }

    // Create a new class object with the entered data
    const newClass: ClassData = {
      id: idCounter.current,
      name: className,
      major: classMajor,
      attendanceRequired: minimumClassAttendance,
    };

    idCounter.current++;
    // Add the new class to your data or state
    setClasses([...classes, newClass]);

    // Clear the input fields and close the modal
    toggleModal();
  };

  function onAvatarPress() {
    console.log("Professor Entered Edit Profile Screen");
    props.navigation.navigate("ProfileDetailScreen", {});
  }

  // the modal
  const modalContent = (
    <View style={[modalStyles.modalContainer]}>
      <View style={modalStyles.modalContent}>
        <Text style={modalStyles.title}>New Class</Text>
        <TextInput
          placeholder="Class Name"
          placeholderTextColor={'#888'}
          style={modalStyles.input}
          value={className}
          onChangeText={(text) => setClassName(text)}
        />
        <TextInput
          placeholder="Major"
          placeholderTextColor={'#888'}
          style={modalStyles.input}
          value={classMajor}
          onChangeText={(text) => setClassMajor(text)}
        />
        <TextInput
          placeholder="Attendance Required"
          placeholderTextColor={'#888'}
          keyboardType="numeric"
          style={modalStyles.input}
          onChangeText={(text) => setMinimumClassAttendance(parseInt(text))}
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

  // students for test purposes
  const students: Student[] = [];
  for (let i = 0; i < 40; i++) {
    students.push(generateRandomStudent());
  }

  const handleClassPress = (className: string) => {
    props.navigation.navigate("ClassDetailScreen", { className, students });
  };

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
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ClassCard
              classData={item}
              onPressed={handleClassPress}
              onDelete={onDeleteClass}
            ></ClassCard>
          )}
        />
        <CustomButton title="Add Class" onPress={toggleModal} />
      </View>
    </View>
  );
};

export default HomeScreen;
