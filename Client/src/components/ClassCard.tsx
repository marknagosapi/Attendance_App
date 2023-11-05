import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ClassCardProps {

    classData: ClassData,
    onPressed: (className: string) => void,
    onDelete: (id: string) => void

}

const ClassCard: React.FC<ClassCardProps> = (props: ClassCardProps) => {
  const currentClass = props.classData

  const handleDelete = () => {
    props.onDelete(currentClass.classId); // Trigger the delete action with the class ID
  };

  const handlePressOnClass = () => {
      props.onPressed(currentClass.className);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePressOnClass}>
      <View style={styles.leftContent}>
        <Text style={styles.name}>{currentClass.className}</Text>
        <Text style={styles.major}>{currentClass.majors.join(', ')}</Text>
        <Text style={styles.attendanceRequired}>
          Attendance Required: {currentClass.maxAttendance}
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange left content and delete button horizontally
    alignItems: 'center',
    justifyContent: 'space-between', // Push items to the left and right edges
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  leftContent: {
    flex: 1, // Expand to take all available space on the left
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  major: {
    fontSize: 16,
  },
  attendanceRequired: {
    fontSize: 14,
  },
});

export default ClassCard;
