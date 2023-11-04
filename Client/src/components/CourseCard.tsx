import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CourseCardProps {

    courseData: CourseData,
    onPressed: (courseName: string) => void,
    onDelete: (id: number) => void

}
const CourseCard: React.FC<CourseCardProps> = (props: CourseCardProps) => {
  const currentCourse = props.courseData

  const handleDelete = () => {
    props.onDelete(currentCourse.id); // Trigger the delete action with the course ID
  };

  const handlePressOnClass = () => {
      props.onPressed(currentCourse.name);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePressOnClass}>
      <View style={styles.leftContent}>
        <Text style={styles.name}>{currentCourse.name}</Text>
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
//   major: {
//     fontSize: 16,
//   },
//   attendanceRequired: {
//     fontSize: 14,
//   },
});

export default CourseCard;
