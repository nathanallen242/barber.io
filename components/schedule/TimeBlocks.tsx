import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TimeBlockProps {
  selectedDay: Date;
  availability: { hour: number; selected: boolean }[];
  toggleTimeBlock: (dayId: string, hour: number) => void;
}

const TimeBlocks: React.FC<TimeBlockProps> = ({ selectedDay, availability, toggleTimeBlock }) => {
 const dayOfWeek = selectedDay.getDay().toString();

 const convertToAMPM = (hour: number) => {
   let ampm = hour >= 12 ? 'PM' : 'AM';
   hour = hour % 12;
   hour = hour ? hour : 12;
   return `${hour}:00 ${ampm} `;
 };

 return (
   <View>
     {availability.map((block, index) => (
       <TouchableOpacity
        key={index}
        onPress={() => toggleTimeBlock(dayOfWeek, block.hour)}
        style={[styles.timeBlock, block.selected && styles.selectedTimeBlock]}
       >
        <Text style={styles.timeBlockText}>{convertToAMPM(block.hour)}</Text>
       </TouchableOpacity>
     ))}
   </View>
 );
};

const styles = StyleSheet.create({
  timeBlock: {
    // Add your styles for the time block card here
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTimeBlock: {
    // Add your styles for the selected time block here
    backgroundColor: 'skyblue',
  },
  timeBlockText: {
    // Add your styles for the time block text here
  },
});

export default TimeBlocks;