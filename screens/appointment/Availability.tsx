import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { ref, onValue } from 'firebase/database';
import { FIREBASE_DB } from '../../config/FireBase';
import { BarberData } from './Barber';
import StarRatingDisplay from 'react-native-star-rating-widget';

const Availability: React.FC = () => {
  const { appointmentDetails } = useContext(AppointmentContext);
  const [barber, setBarber] = useState<BarberData | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const selectedBarber = appointmentDetails?.employee_id;

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
   const dayAbbreviation = new Date(dayId).toLocaleDateString(undefined, { weekday: 'short' });
   return (
   <TouchableOpacity style={styles.dayBlock} onPress={() => setSelectedDay(dayOfWeek.toString())}>
     <Text style={styles.dayNumber}>{dayNumber}</Text>
     <Text style={styles.dayAbbreviation}>{dayAbbreviation}</Text>
   </TouchableOpacity>
   );
  };


  const renderTimeBlocks = () => {
   if (!selectedDay || !barber?.availability[selectedDay]) {
     console.log("selectedDay or barber.availability[selectedDay] is not defined");
     return null;
   }
  
   const availability = barber.availability[selectedDay];
   const fromHour = parseInt(availability.from.split(':')[0], 10);
   const toHour = parseInt(availability.to.split(':')[0], 10);
  
   return (
     <FlatList
       data={Array.from({ length: toHour - fromHour }, (_, i) => i + fromHour)}
       renderItem={({ item: hour }) => (
         <TouchableOpacity style={styles.timeBlock}>
           <Text>{hour}:00</Text>
         </TouchableOpacity>
       )}
       keyExtractor={(item) => item.toString()}
     />
   );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Step 3: Book your Slot</Text>
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
            <FlatList
              data={getDays()}
              horizontal
              renderItem={renderDayItem}
              keyExtractor={(item) => item}
              style={styles.flatList}
              showsHorizontalScrollIndicator={false}
            />
            {renderTimeBlocks()}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    margin: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  timeBlock: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  dayBlock: {
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
    width: 63,
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
});

export default Availability;
