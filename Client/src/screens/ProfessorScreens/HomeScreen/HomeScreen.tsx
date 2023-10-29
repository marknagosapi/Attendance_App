import React, {useState} from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import Header from '@/components/Header'
import { NavigationProp} from '@react-navigation/native';
import { styles } from './HomeScreenStyle';


type HomeScreenProps = {
  navigation: NavigationProp<any>
}

const HomeScreen = (props:HomeScreenProps) => {
  const userAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9RrEEwHG9qbjJh5VHu40cxzs60Ygg1GwfL9v79qC-w&s'; // Replace with the actual user's avatar URL

  function onAvatarPress(){
        console.log("hello!")
        props.navigation.navigate('ProfileDetailScreen')
  }

  const handleClassPress = (className: string) => {
    // You can define the action to be performed when a class is pressed
    // For example, navigate to a class details screen:
    // navigation.navigate('ClassDetails', { className });
    console.log(className)
  };

  const [classList, setClassList] = useState([
    { id: '1', className: 'Math 101', major: 'Mathematics' },
    { id: '2', className: 'History 101', major: 'History' },
  ]);

  const addClass = () => {
    const newClass = {
      id: (Math.random() + 1).toString(36).substring(7), // Generate a random ID
      className: 'New Class',
      major: 'New Major',
    };
    setClassList([...classList, newClass]);
  };

  return (
    
    <View style={{flex:1}}>
        <Header title='Home Screen' userAvatar={userAvatar} onPress={onAvatarPress}></Header>
        <View style={styles.container}>
        <Text style={styles.yourClassesText}>Your Classes</Text>
            <FlatList
            data={classList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClassPress(item.className)}>
                <View style={styles.classItem}>
                  <Text style={styles.className}>{item.className}</Text>
                  <Text style={styles.major}>{item.major}</Text>
                </View>
              </TouchableOpacity>
            )}
        />
        <TouchableOpacity style={styles.addButton} onPress={addClass}>
            <Text style={styles.addButtonText}>Add Class</Text>
        </TouchableOpacity>
        </View>    
    </View>
  
  );
};

export default HomeScreen;
