import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Alert, Text, View, Image, StyleSheet, FlatList, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { AuthContext } from '../../contexts/AuthContext';
import { ref, onValue, set } from 'firebase/database';
import { FIREBASE_DB } from '../../config/Firebase';
import { BarberData, defaultBarberData } from './Barber';
import { Appointment } from '../../contexts/AppointmentContext';
import StarRatingDisplay from 'react-native-star-rating-widget';
import Picker from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { fetchBookedAppointments } from '../../utils/timeUtils';

interface AvailabilityProps {
  navigation: any;
}

const Availability: React.FC<AvailabilityProps> = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { appointmentDetails, saveAppointmentDetails, addAppointment } = useContext(AppointmentContext);
  const [barber, setBarber] = useState<BarberData | null>(null);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const selectedBarber = appointmentDetails?.employee_id;
  // const [bookedHours, setBookedHours] = useState<string[]>([]);

  const [location, setLocation] = useState('USF Tampa Campus');
  const DAYS_MAP = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [dropdown, setDropdown] = useState(false);

  const confirmAppointment = async () => {
    Alert.alert(
      "Confirm Appointment",
      "Are you sure you want to confirm this appointment?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            // Omit the appointment_id here, it will be set in addAppointment
            const appointment: Omit<Appointment, 'appointment_id'> = {
              ...appointmentDetails,
              start_time: appointmentDetails?.start_time,
              end_time: appointmentDetails?.end_time,
              employee_id: appointmentDetails?.employee_id || '',
              employee: barber || defaultBarberData,
              service_id: appointmentDetails?.service_id || null,
              day_of_week: appointmentDetails?.day_of_week || '', 
              date: appointmentDetails?.date || new Date().toDateString(),
              location: appointmentDetails?.location || 'USF Tampa Campus',
            };
  
            saveAppointmentDetails(appointment);
            addAppointment(appointment as Appointment);
            navigation.navigate('Schedule', { screen: 'Event' });
          }
        }
      ],
      { cancelable: false }
    );
  };
  

  useEffect(() => {
    if (selectedBarber) {
      const dbRef = ref(FIREBASE_DB, `/employees/`);
      onValue(dbRef, (snapshot) => {
        const snapshotVal = snapshot.val();
        const newBarber = snapshotVal[selectedBarber];
        setBarber(newBarber);
      });
    }
  }, [selectedBarber]);


  useEffect(() => {
    if (selectedDay) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedDay]);


  
  
  // useEffect(() => {
  //   if (selectedBarber && selectedDay !== null) {
  //     fetchBookedAppointments(selectedBarber).then(bookedAppointmentsMap => {
  //       setBookedHours(bookedAppointmentsMap[selectedDay] || []);
  //     });
  //   }
  // }, [selectedBarber, selectedDay]);
  

  const getDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(day.getDate() + i);
      days.push(day.toISOString().split('T')[0]);
    }
    return days;
  };

  
  const renderDayItem = ({ item: dayId }: { item: string }) => {
   const dayOfWeek = ((new Date(dayId).getDay() + 6) % 7);
   const dayNumber = new Date(dayId).getDate();
   const dayAbbreviation = DAYS_MAP[dayOfWeek];
   return (
     <TouchableOpacity 
       style={[styles.dayBlock, selectedDay === dayOfWeek.toString() ? styles.selectedDay : {}]} 
       onPress={() => setSelectedDay(dayOfWeek.toString() === selectedDay ? null : dayOfWeek.toString())}
     >
       <Text style={styles.dayNumber}>{dayNumber}</Text>
       <Text style={styles.dayAbbreviation}>{dayAbbreviation}</Text>
     </TouchableOpacity>
   );
  };


  const renderTimeBlocks = () => {
   if (!selectedDay || !barber?.availability[selectedDay]) {
     return null;
   }
  
   const availability = barber.availability[selectedDay];
   const fromHour = parseInt(availability.from.split(':')[0], 10);
   const toHour = parseInt(availability.to.split(':')[0], 10);
  
   return (
    <Animated.View style={{...styles.timeContainer, opacity}}>
      <FlatList
        data={Array.from({ length: toHour - fromHour }, (_, i) => i + fromHour)}
        renderItem={({ item: hour }) => {
          const period = hour >= 12 ? 'PM' : 'AM';
          const formattedHour = hour % 12 || 12;
          const timeString = `${formattedHour}:00 ${period}}`;
          // const isBooked = bookedHours.includes(timeString);
          return (
            <TouchableOpacity 
              style={[styles.timeBlock, 
                selectedTime === hour ? styles.selectedTimeBlock : {}]}
                // isBooked ? { backgroundColor: '#ccc' } : {}
              onPress={() => {
                 setSelectedTime(hour === selectedTime ? null : hour);
                 const startTime = new Date();
                 startTime.setHours(hour);
                 const endTime = new Date(startTime);
                 endTime.setHours(startTime.getHours() + 1);
                 const startTimeStr = `${startTime.getHours()}:00 ${startTime.getHours() >= 12 ? 'PM' : 'AM'}`;
                 const endTimeStr = `${endTime.getHours()}:00 ${endTime.getHours() >= 12 ? 'PM' : 'AM'}`;
                 saveAppointmentDetails({
                   start_time: startTimeStr,
                   end_time: endTimeStr,
                   client_id: user?.uid || 'guest',
                   day_of_week: selectedDay,
                 });
              }}
            >
              <Text>{formattedHour}:00 {period}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.toString()}
      />
    </Animated.View>
  );
  };

  return (
   <SafeAreaView style={{flex: 1}}>
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Step 3: Book your Slot</Text>
        <TouchableOpacity 
         onPress={confirmAppointment}
         style={{ position: 'absolute', right: 15, top: 25 }}
        >
         <FontAwesomeIcon 
          icon={faCheckCircle} 
          size={30} 
          color={selectedTime ? "blue" : "grey"} 
         />
        </TouchableOpacity>
        {barber && (
          <>
            <Image source={{ uri: barber.photoURL }} style={styles.image} />
            <Text style={styles.text}>{barber.displayName}</Text>
            <StarRatingDisplay
              rating={barber.averageRating}
              maxStars={5}
              starSize={30}
              color='#000'
              style={{ alignSelf: 'center', marginTop: 5 }}
              onChange={() => {}}
            />
            <Text style={styles.dayHeader}>Day</Text>
            <View style={{flexDirection: 'row'}}>
              <FlatList
                data={getDays()}
                horizontal
                renderItem={renderDayItem}
                keyExtractor={(item) => item}
                style={styles.flatList}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
              />
            </View>
            <Text style={styles.availabilityHeader}>Availability</Text>
            {renderTimeBlocks()}
            <Text style={styles.availabilityHeader}>Location</Text>
            <View style={styles.picker}>
              <Picker
              items={[
                { label: "USF Tampa Campus", value: "USF Tampa Campus" },
                { label: "USF St. Pete Campus", value: "USF St. Pete Campus" },
                { label: "USF Sarasota Campus", value: "USF Sarasota Campus" },
                { label: "Off-Campus", value: "Off-Campus" },
              ]}
              value={location}
              onValueChange={(value) => {
                setLocation(value);
                setDropdown(!dropdown);
                saveAppointmentDetails({ location: value });
              }}
            />
            <Icon name={dropdown ? "arrow-forward" : "arrow-drop-down"} size={20} style={{position: 'absolute', right: 4, bottom: 7}} color="gray" />
          </View>
        </>
        )}
      </View>
    </ScrollView>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    padding: 10,
    marginLeft: 28,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    width: 150,
    elevation: 2  // for Android shadow effect
  },
  availabilityHeader: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 30,
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  dayHeader: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 35,
    marginLeft: 30,
    alignSelf: 'flex-start'
  },
  flatList: {
    margin: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 25,
    alignSelf: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
  dayBlock: {
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    width: 65,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
   },
  dayNumber: {
    fontSize: 20,
    fontWeight: 'bold',
   },
  dayAbbreviation: {
    fontSize: 14,
   },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeBlock: {
    width: 100, // Increase width
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginVertical: 5,
    marginLeft: 25,
    marginHorizontal: 10,
  },
  selectedTimeBlock: {
    backgroundColor: '#ff0', // Change to desired highlight color
  },
  selectedDay: {
    backgroundColor: '#ff0', // Change to desired highlight color
  },
});

export default Availability;
