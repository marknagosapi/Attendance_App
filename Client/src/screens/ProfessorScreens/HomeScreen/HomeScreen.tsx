import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import Header from "@/components/Header";
import { styles, modalStyles } from "./HomeScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfessorRootStackParamList } from "@/route/RouteStackParamList";
import CustomButton from "@/components/CustomButton";
import ClassCard from "@/components/ClassCard";
import { BACKEND_URL } from "@/Utils/placeholders";
import { CheckBox } from "react-native-elements";
import { MAJORS } from "@/Utils/placeholders";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ClassHoldModal from "@/components/ClassHoldModal";
import Colors from "@/constants/Colors";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<
    ProfessorRootStackParamList,
    "HomeScreen"
  >;
};

const HomeScreen = (props: HomeScreenProps) => {
  // redux data
  const teacherId = useSelector((state: RootState) => state.auth.userId);
  const userAvatar = useSelector((state: RootState) => state.auth.userAvatar);

  // screen data
  const [className, setClassName] = useState("");
  const [majors, setSelectedMajors] = useState<string[]>([]);
  const [maxAttendance, setMinimumClassAttendance] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [loadingClasses, setLoadingClassess] = useState(true);

  // for the class hold (starting from)
  const [selectedClass, setSelectedClass] = useState<Partial<ClassData> | null>(
    null
  );

  const [isHoldModalVisible, setHoldModalVisible] = useState(false);

  const handleClassHold = (
    classId: string,
    className: string,
    majors: string[],
    maxAttendance: number
  ) => {
    setSelectedClass({ classId, className, majors, maxAttendance });
    setHoldModalVisible(true);
  };

  const handleEdit = async () => {
    refresh();
    closeModal();
  };

  const handleDelete = async () => {
    await fetch(
      BACKEND_URL + "/delete_class?classId=" + selectedClass?.classId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedClasses = classes.filter(
          (cls) => cls.classId !== selectedClass?.classId
        );
        setClasses(updatedClasses);
      })
      .catch((error) => {
        console.error(
          "Error Deleting Class, ID:" + selectedClass?.classId,
          error
        );
      });

    console.log(
      "[ID]: " +
        selectedClass?.classId +
        " [NAMED]: " +
        selectedClass?.className +
        " DELETED "
    );
    closeModal();
  };

  const closeModal = () => {
    setHoldModalVisible(false);
  };

  // for the hold modal (end)

  const refresh = () => {
    // Call this function to re-fetch the data
    setRefreshData((prevRefreshData) => !prevRefreshData); // Toggles the refreshData state
  };

  // functions
  const toggleModal = () => {
    setClassName("");
    setSelectedMajors([]);
    setMinimumClassAttendance(0);
    setModalVisible(!isModalVisible);
  };

  // Function to get classes by teacherIds
  const getClasses = async () => {
    await fetch(BACKEND_URL + "/get_classes?userId=" + teacherId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClasses(data);
        setLoadingClassess(false);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  useEffect(() => {
    getClasses();
  }, [refreshData]);

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

    fetch(BACKEND_URL + "/create_class", {
      method: "POST",
      body: JSON.stringify({ teacherId, className, majors, maxAttendance }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Class created:", data);
        refresh();
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

  const handleClassPress = (
    className: string,
    classCode: string,
    classId: string,
    maxAttendance: number
  ) => {
    props.navigation.navigate("ClassDetailScreen", {
      className,
      classCode,
      classId,
      maxAttendance,
    });
  };

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
        <ClassHoldModal
          visible={isHoldModalVisible}
          onClose={closeModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
          classData={
            selectedClass
              ? selectedClass
              : { classId: "", className: "", majors: [""], maxAttendance: 0 }
          }
        />
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
              onHold={handleClassHold}
            ></ClassCard>
          )}
        />
        <CustomButton title="Add Class" onPress={toggleModal} />
      </View>
    </View>
  );
};

export default HomeScreen;
