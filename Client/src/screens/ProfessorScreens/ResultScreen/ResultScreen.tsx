// ResultScreen.tsx
import CustomButton from '@/components/CustomButton';
import Header from '@/components/Header';
import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import {styles} from './ResultScreenStyle'

interface Student {
  id: number;
  name: string;
  present: boolean;
}

const ResultScreen: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Student 1', present: false },
    { id: 2, name: 'Student 2', present: false },
    { id: 3, name: 'Student 3', present: false },
    { id: 4, name: 'Student 1', present: false },
    { id: 5, name: 'Student 2', present: false },
    { id: 6, name: 'Student 3', present: false },
    { id: 7, name: 'Student 1', present: false },
    { id: 8, name: 'Student 2', present: false },
    { id: 9, name: 'Student 3', present: false },
    { id: 10, name: 'Student 1', present: false },
    { id: 11, name: 'Student 2', present: false },
    { id: 12, name: 'Student 3', present: false },
    // Add more students as needed
  ]);

  const toggleAttendance = (studentId: number) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  const getStatusText = (present: boolean) => (present ? 'Present' : 'Absent');

  const saveResults = () => {
    // Process the attendance data here (e.g., send it to an API, save it to storage, etc.)
    console.log('Attendance data:', students);
  };

  return (
    <View style={{flex:1}}>
    <Header title="Result Screen"></Header>
        <View style={styles.container}>
        <View style={styles.headerRow}>
            <Text style={styles.headerText}>Student Names</Text>
            <Text style={styles.headerText}>Presence</Text>
        </View>

        <FlatList
            data={students}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.studentRow}>
                <Text style={styles.studentName}>{item.name}</Text>
                <View style={styles.statusContainer}>
                <View
                    style={[
                    styles.statusIndicator,
                    { backgroundColor: item.present ? 'green' : 'red' },
                    ]}
                    onTouchEnd={() => toggleAttendance(item.id)}
                />
                <Text style={styles.statusText}>
                    {getStatusText(item.present)}
                </Text>
                </View>
            </View>
            )}
        />

        <CustomButton title="Save Results" onPress={saveResults}/>

        </View>
    </View>
  );
};

export default ResultScreen;
