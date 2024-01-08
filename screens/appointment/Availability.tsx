import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet, FlatList, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';
import { AppointmentContext } from '../../contexts/AppointmentContext';
import { ref, onValue } from 'firebase/database';
import { FIREBASE_DB } from '../../config/FireBase';
import { BarberData } from './Barber';
import StarRatingDisplay from 'react-native-star-rating-widget';

const Availability: React.FC = () => {
  const { appointmentDetails } = useContext(AppointmentContext);
  const [barber, setBarber] = useState<BarberData | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const selectedBarber = appointmentDetails?.employee_id;

  const DAYS_MAP = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
       style={[styles.dayBlock, selectedDay === dayOfWeek.toString() && styles.selectedDay]} 
       onPress={() => setSelectedDay(dayOfWeek.toString())}
     >
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
      <Animated.View style={{...styles.timeContainer, opacity}}>
       <FlatList
         data={Array.from({ length: toHour - fromHour }, (_, i) => i + fromHour)}
         renderItem={({ item: hour }) => {
           const period = hour >= 12 ? 'PM' : 'AM';
           const formattedHour = hour % 12 || 12;
           return (
             <TouchableOpacity 
               style={[styles.timeBlock, selectedDay && selectedDay === hour.toString() ? styles.selectedTimeBlock : {}]}
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
    <SafeAreaView style = {{flex: 1}}>
      <ScrollView style = {{flex: 1}}>
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
            <Text style={styles.dayHeader}>Day</Text>
            <FlatList
              data={getDays()}
              horizontal
              renderItem={renderDayItem}
              keyExtractor={(item) => item}
              style={styles.flatList}
              showsHorizontalScrollIndicator={false}
            />
            <Text style={styles.availabilityHeader}>Availability</Text>
            {renderTimeBlocks()}
          </>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
   );   
};

const styles = StyleSheet.create({
  availabilityHeader: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 35,
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
});

export default Availability;
