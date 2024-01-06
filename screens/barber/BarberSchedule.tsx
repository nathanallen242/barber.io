import React, { useState, useEffect } from 'react';
import { Text, Platform, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import TimeBlocks from '../../components/schedule/TimeBlocks';

interface TimeBlock {
  hour: number;
  selected: boolean;
}

interface WeekdayAvailability {
  [key: string]: TimeBlock[]; // '0' for Sunday, '1' for Monday, etc.
}

const initializeTimeBlocks = () => {
    return new Array(9).fill(null).map((_, i) => ({ hour: i + 8, selected: false }));
  };
  
const defaultWeekdayAvailability: WeekdayAvailability = {};
  for (let i = 0; i < 7; i++) {
    defaultWeekdayAvailability[i.toString()] = initializeTimeBlocks();
}
  

const BarberSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [show, setShow] = useState(false);
  const [weekdayAvailability, setWeekdayAvailability] = useState<WeekdayAvailability>(defaultWeekdayAvailability);

  const onDayPress = (day: any) => {
    setSelectedDay(new Date(day.timestamp));
    setShow(Platform.OS !== 'ios');
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS !== 'ios');
    setSelectedDay(currentDate);
  };

  const toggleTimeBlock = (dayId: string, hour: number) => {
    setWeekdayAvailability(prev => {
      const updatedDayAvailability = prev[dayId].map(block => {
        if (block.hour === hour) {
          return { ...block, selected: !block.selected };
        }
        return block;
      });
      return { ...prev, [dayId]: updatedDayAvailability };
    });
  };

  const dayKey = selectedDay.toISOString().split('T')[0];
  const dayOfWeek = selectedDay.getDay().toString();

  return (
    <SafeAreaView>
      <Text style={styles.header}>Modify your Availability</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [dayKey]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDay}
          mode={'time'}
          display="default"
          onChange={onChange}
        />
      )}
      {selectedDay && (
        <ScrollView style={{  }}>
          <TimeBlocks
            selectedDay={selectedDay}
            availability={weekdayAvailability[dayOfWeek]}
            toggleTimeBlock={toggleTimeBlock}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
});

export default BarberSchedule;
