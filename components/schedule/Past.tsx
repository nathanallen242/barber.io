import React, { useState, useCallback, useRef } from 'react';
import { FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import Card from '../profile/Card';
import { useIsFocused } from '@react-navigation/native';

const Past: React.FC = () => {
 const [appointments, setAppointments] = useState([
 { name: "John Doe", jobTitle: "Software Engineer", date: "Tuesday, 2 January", duration: "00:00 - 00:00", rating: 4.5 },
 { name: "Jane Smith", jobTitle: "Data Scientist", date: "Wednesday, 3 January", duration: "01:00 - 02:00", rating: 4.0 },
 ]);
 const [page, setPage] = useState(1);
 const loading = useRef(false);
 const isFocused = useIsFocused();

 const fetchMoreData = useCallback(async () => {
 if (!loading.current) {
   loading.current = true;
   // Fetch more data here...
   setPage(prevPage => prevPage + 1);
   loading.current = false;
 }
 }, []);

 return (
 <SafeAreaView style={[styles.container, { opacity: isFocused ? 1: 0.5}]}>
   <Text style={styles.title}>Past Schedule</Text>
   <FlatList
     data={appointments}
     renderItem={({ item }) => <Card {...item} />}
     keyExtractor={item => item.name}
     onEndReached={fetchMoreData}
     onEndReachedThreshold={0.1}
     contentContainerStyle={styles.scrollViewContainer}
     style={{height: '85%'}}
   />
 </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 container: {
  flexDirection: 'column',
 },
 title: {
  fontSize: 25,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 10,
  marginLeft: 20,
  alignSelf: 'center',
 },
 scrollViewContainer: {
  flexGrow: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
 },
});

export default Past;