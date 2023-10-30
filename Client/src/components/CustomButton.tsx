
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors'
import Sizes from '@/constants/Sizes'

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: Colors.usedGreenColor,
    padding: 10,
    borderRadius: Sizes.defaultBorderRadius,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CustomButton;
