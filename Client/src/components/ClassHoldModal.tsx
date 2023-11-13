import Colors from "@/constants/Colors";
import Sizes from "@/constants/Sizes";
import React, { useEffect, useState } from "react";

import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

interface ClassModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  classData: Partial<ClassData>;
}

const ClassModal: React.FC<ClassModalProps> = (props: ClassModalProps) => {
  const [editedClassData, setEditedClassData] = useState<Partial<ClassData>>(
    {}
  );

  useEffect(() => {
    setEditedClassData(props.classData);
  }, [props.classData]);

  const handleClose = () => {
    // clear the modal cucc
    props.onClose();
  };

  return (
    <Modal visible={props.visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editedClassData.className}
              onChangeText={(text) => {
                setEditedClassData({ ...editedClassData, className: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Majors (comma-separated)"
              value={editedClassData.majors?.join(", ")}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Minimum Required Attendance"
              value={editedClassData.maxAttendance?.toString()}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={props.onEdit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDelete}
              onPress={props.onDelete}
            >
              <Text style={styles.buttonDeleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: Colors.usedGreenColor,
    borderRadius: Sizes.defaultBorderRadius / 2,
  },
  modalInputContainer: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: Colors.whiteColor,
    borderWidth: 2,
    borderColor: Colors.whiteColor,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: Colors.whiteColor,
    padding: 10,
    borderRadius: 5,
    width: "25%",
    alignItems: "center",
  },
  buttonDelete: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    width: "25%",
    alignItems: "center",
  },
  buttonDeleteText: {
    color: Colors.whiteColor,
    fontWeight: "bold",
  },
  buttonText: {
    color: Colors.usedGreenColor,
    fontWeight: "bold",
  },
});

export default ClassModal;
