import React, { useState, useEffect } from "react";
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
import ClassCard from "@/components/ClassCard";
import { BACKEND_URL, userAvatarPlaceholder } from "@/Utils/placeholders";
import { CheckBox } from "react-native-elements";
import { MAJORS } from "@/Utils/placeholders";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<
    ProfessorRootStackParamList,
    "HomeScreen"
  >;
};

const HomeScreen = (props: HomeScreenProps) => {
  // redux data
  const teacherID = useSelector((state: RootState) => state.auth.userId);
  const [isModalVisible, setModalVisible] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const teacherIds = [teacherID, "0242"]; // amig lajos kicsereli a backendben

  // screen data
  const [className, setClassName] = useState("");
  const [majors, setSelectedMajors] = useState<string[]>([]);
  const [maxAttendance, setMinimumClassAttendance] = useState(0);

  const toggleModal = () => {
    setClassName("");
    setSelectedMajors([]);
    setMinimumClassAttendance(0);
    setModalVisible(!isModalVisible);
  };

  const onDeleteClass = (idToDelete: string) => {
    console.log("onDeleteClass");
  };

  // Function to get classes by teacherIds
  const getClasses = () => {
    fetch(BACKEND_URL + "/get_classes?userId=" + teacherID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  useEffect(() => {
    getClasses();
  }, []);

  const toggleMajor = (major: string) => {
    if (majors.includes(major)) {
      setSelectedMajors(majors.filter((m) => m !== major));
    } else {
      setSelectedMajors([...majors, major]);
    }
  };

  const createClass = () => {
    if (className == "" || majors.length <= 0 || isNaN(maxAttendance)) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log(majors);
    fetch(BACKEND_URL + "/create_class", {
      method: "POST",
      body: JSON.stringify({ teacherIds, className, majors, maxAttendance }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Class created:", data);
      })
      .catch((error) => {
        console.error("Error creating class:", error);
      });

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
          placeholderTextColor={"#888"}
          style={modalStyles.input}
          value={className}
          onChangeText={(text) => setClassName(text)}
        />
        <Text style={styles.headerText}>Select Majors:</Text>
        {MAJORS.map((major) => (
          <CheckBox
            textStyle={styles.checkBoxText}
            containerStyle={styles.checkBoxContainer}
            key={major.value}
            title={major.label}
            checked={majors.includes(major.value)}
            onPress={() => toggleMajor(major.value)}
          />
        ))}
        <TextInput
          placeholder="Attendance Required"
          placeholderTextColor={"#888"}
          keyboardType="numeric"
          style={modalStyles.input}
          onChangeText={(text) => setMinimumClassAttendance(parseInt(text))}
        />
        <View style={modalStyles.buttonHolder}>
          <TouchableOpacity style={[modalStyles.button]} onPress={createClass}>
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
          keyExtractor={(item) => item.classId}
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
