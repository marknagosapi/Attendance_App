import React from 'react';
import { View, Text} from 'react-native';
import Header from '@/components/Header';
import { styles } from "./StudentClassDetailScreenStyle";
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {StudentRootStackParamList} from '@/route/RouteStackParamList'
import CircularProgress from 'react-native-circular-progress-indicator';



type StudentClassDetailScreenRouteProp = RouteProp<StudentRootStackParamList, 'StudentClassDetailScreen'>;
type StudentClassDetailScreenNavigationProp = NativeStackNavigationProp<StudentRootStackParamList, 'StudentClassDetailScreen'>;

type Props = {
    route: StudentClassDetailScreenRouteProp;
    navigation: StudentClassDetailScreenNavigationProp;
  };


const StudentClassDetailScreen: React.FC<Props> = ( props ) => { //class Id
  //const { className, requiredAttendance, attendedHours } = props.route.params;

  //dummy ertekek
  const className = 'Android'
  const requiredAttendance = 14
  const attendedHours = 12

  

  return (
    <View style={{flex:1}}>
      <Header title={className} goesBack />
      <View style={styles.textContainer}>
        <Text style={styles.className}>{className}</Text>
        <Text style={styles.requiredAttendance}>Required attendance: {requiredAttendance}</Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={{fontSize: 18, padding: 12} }>Your attendance:</Text>
        <CircularProgress
          value={attendedHours}
          maxValue={requiredAttendance}
          radius={120}
          activeStrokeWidth={40}
          inActiveStrokeWidth={40}
          inActiveStrokeColor='black'
          progressValueColor={'black'}
          duration={250} // Animáció időtartama
          strokeColorConfig={[
            { color: 'red', value: 0 },
            { color: 'skyblue', value: requiredAttendance*0.5},
            { color: 'green', value: requiredAttendance },
          ]}
        />
      </View>
    </View>
    
  );
};


export default StudentClassDetailScreen;

