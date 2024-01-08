import React, { useState, useEffect, useCallback } from 'react';
import { Text, Platform, SafeAreaView, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import TimeBlocks from '../../components/schedule/TimeBlocks';
import { ref, set, get } from 'firebase/database';
import { FIREBASE_DB } from '../../config/FireBase';
import { AuthContext } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';


interface TimeBlock {
  hour: number;
  selected: boolean;
}

interface WeekdayAvailability {
  [key: string]: TimeBlock[]; // '0' for Sunday, '1' for Monday, etc.
}

interface DayAvailability {
 from: string;
 to: string;
}

const initializeTimeBlocks = () => {
    return new Array(9).fill(null).map((_, i) => ({ hour: i + 8, selected: false }));
  };
  
const defaultWeekdayAvailability: WeekdayAvailability = {};
  for (let i = 0; i < 7; i++) {
    defaultWeekdayAvailability[i.toString()] = initializeTimeBlocks();
}
  

const BarberSchedule: React.FC = () => {
  const { user } = React.useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [show, setShow] = useState(false);
  const [weekdayAvailability, setWeekdayAvailability] = useState<WeekdayAvailability>(defaultWeekdayAvailability);

  const dayKey = selectedDay.toISOString().split('T')[0];
  const dayOfWeek = selectedDay.getDay().toString();

  const onDayPress = (day: any) => {
   if (day && day.timestamp) {
     setSelectedDay(new Date(day.timestamp));
     setShow(Platform.OS !== 'ios');
  
     const newDayOfWeek = new Date(day.timestamp).getDay().toString();
     if (!weekdayAvailability[newDayOfWeek].some(block => block.selected)) {
       setWeekdayAvailability(prev => ({
         ...prev,
         [newDayOfWeek]: initializeTimeBlocks(),
       }));
     }
   }
  };
  
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
   const currentDate = selectedDate || new Date();
   setShow(Platform.OS !== 'ios');
   setSelectedDay(currentDate);
  };

  const setBarberAvailability = useCallback(async (barberId: string, availability: WeekdayAvailability) => {
   const availabilityCollectionRef = ref(FIREBASE_DB, `/employees/${barberId}/availability`);
   const availabilityData: Record<string, DayAvailability> = {};
  
   for (const dayId in availability) {
    const timeBlocks = availability[dayId];
    const selectedBlocks = timeBlocks.filter(block => block.selected).map(block => block.hour);
    if (selectedBlocks.length > 0) {
      const fromHour = Math.min(...selectedBlocks);
      const toHour = Math.max(...selectedBlocks) + 1;
      const fromAMPM = fromHour >= 12 ? 'PM' : 'AM';
      const toAMPM = toHour >= 12 ? 'PM' : 'AM';
      availabilityData[dayId] = {
        from: `${fromHour}:00 ${fromAMPM} `,
        to: `${toHour}:00 ${toAMPM} `
      };
    }
   }
  
   await set(availabilityCollectionRef, availabilityData);
  }, []);
  const toggleTimeBlock = (dayId: string, hour: number) => {
    setWeekdayAvailability(prev => {
      const updatedDayAvailability = prev[dayId].map(block => {
        if (block.hour === hour) {
          return { ...block, selected: !block.selected };
        }
        return block;
      });
      const updatedAvailability = { ...prev, [dayId]: updatedDayAvailability };

      return updatedAvailability;
    });
  };

  const handleSave = async () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to save your availability?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          const barberId = user?.uid;
          if (barberId) {
            setBarberAvailability(barberId, weekdayAvailability);
          }
        }}
      ]
    );
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      const barberId = user?.uid;
      if (barberId) {
        const availabilitySnapshot = await get(ref(FIREBASE_DB, `/employees/${barberId}/availability`));
        if (availabilitySnapshot.exists()) {
          const availabilityData = availabilitySnapshot.val();
          const newWeekdayAvailability = { ...defaultWeekdayAvailability };
  
          for (const dayId in availabilityData) {
            const dayAvailability = availabilityData[dayId];
            const fromHour = parseInt(dayAvailability.from.split(':')[0], 10);
            const toHour = parseInt(dayAvailability.to.split(':')[0], 10);
  
            newWeekdayAvailability[dayId] = newWeekdayAvailability[dayId].map(block => ({
              ...block,
              selected: block.hour >= fromHour && block.hour < toHour
            }));
          }
          setWeekdayAvailability(newWeekdayAvailability);
        }
      }
    };
  
    fetchAvailability();
  }, [user?.uid]);
  
  

  return (
    <SafeAreaView>
      <Text style={styles.header}>Modify your Availability</Text>
      <TouchableOpacity onPress={handleSave}>
        <Icon name="save" size={30} color="black" style={{ alignSelf: 'center', marginBottom: 5 }} />
      </TouchableOpacity>
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
      {selectedDay && weekdayAvailability[dayOfWeek] && (
       <ScrollView style={{ }}>
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
