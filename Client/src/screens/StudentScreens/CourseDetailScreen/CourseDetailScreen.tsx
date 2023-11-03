import React from 'react';
import { View, Text, FlatList,TouchableOpacity} from 'react-native';
import CustomHeader from '@/components/Header';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {StudentRootStackParamList} from '@/route/RouteStackParamList'

type CourseDetailScreenRouteProp = RouteProp<StudentRootStackParamList, 'CourseDetailScreen'>;
type CourseDetailScreenNavigationProp = NativeStackNavigationProp<StudentRootStackParamList, 'CourseDetailScreen'>;

type Props = {
    route: CourseDetailScreenRouteProp;
    navigation: CourseDetailScreenNavigationProp;
  };

const CourseDetailScreen: React.FC<Props> = ({ route }) => {
  const { courseName } = route.params; // Get course details from navigation parameter

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{courseName}</Text>
      {/* Itt lehet további kurzus részleteket megjeleníteni */}
    </View>
  );
};

export default CourseDetailScreen;
