import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/profile/Card';
import SearchBar from '../components/search/SearchBar';
import { AuthContext } from '../contexts/AuthContext';
import { Appointment } from '../contexts/AppointmentContext';
import { fetchUpcomingAppointments, fetchPastAppointments } from '../utils/appointmentUtils';

interface HomeProps {
 username: string;
 navigation: any;
}


const Home: React.FC<HomeProps> = ({ username, navigation }) => {
 const [loading, setLoading] = useState<boolean>(true);
 const [mostUpcomingAppointment, setMostUpcomingAppointment] = useState<Appointment | null>(null);
 const [mostRecentAppointment, setMostRecentAppointment] = useState<Appointment | null>(null);
 const { user } = React.useContext(AuthContext);

 useEffect(() => {
  if (user) {
    const fetchAppointments = async () => {
      try {
        const upcomingAppointments = await fetchUpcomingAppointments(user);
        // console.log('Upcoming Appointments:', upcomingAppointments);

        const pastAppointments = await fetchPastAppointments(user);
        // console.log('Past Appointments:', pastAppointments);

        // Sort the appointments based on their dates
        upcomingAppointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        pastAppointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Get the most upcoming and most recent appointments
        setMostUpcomingAppointment(upcomingAppointments[0] || null);
        setMostRecentAppointment(pastAppointments[0] || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  } else {
    // Handle the case when user is not defined
    setLoading(false);
  }
}, [user]);

if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}

 return (
  <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.displayName ?? 'Guest'}</Text>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity 
      style={styles.profilePlaceholder}
      onPress={() => navigation.navigate('User', { screen: 'Profile' })}
  >
      {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
      ) : (
          <FontAwesome name="user" size={30} color="#000" style={{marginTop: 17, marginLeft: 22}} />
      )}
  </TouchableOpacity>
      </View>
    </View>
    
    {mostUpcomingAppointment && (
    <Card
     name={mostUpcomingAppointment?.employee.displayName}
     jobTitle={mostUpcomingAppointment?.employee.role}
     date={mostUpcomingAppointment?.date}
     duration={mostUpcomingAppointment?.start_time + ' - ' + mostUpcomingAppointment?.end_time}
     rating={mostUpcomingAppointment?.employee.averageRating}
     image={mostUpcomingAppointment?.employee.photoURL}
    />
    )}

    <SearchBar />
    
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.componentContainer}>
          <FontAwesome name="usd" size={24} color="grey" />
          <Text style={styles.componentName}>Prices</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.componentContainer}>
          <FontAwesome name="camera" size={24} color="grey" />
          <Text style={styles.componentName}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.componentContainer}>
          <FontAwesome name="list-alt" size={24} color="grey" />
          <Text style={styles.componentName}>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.componentContainer}>
          <FontAwesome name="phone" size={24} color="grey" />
          <Text style={styles.componentName}>Contact</Text>
        </TouchableOpacity>
      </View>
    

    <Text style={styles.title}>Most Recent Appointment</Text>
    
    {mostRecentAppointment && (
    <Card
     name={mostRecentAppointment?.employee.displayName}
     jobTitle={mostRecentAppointment?.employee.role}
     date={mostRecentAppointment?.date}
     duration={mostRecentAppointment?.start_time + ' - ' + mostRecentAppointment?.end_time}
     rating={mostRecentAppointment?.employee.averageRating}
     image={mostRecentAppointment?.employee.photoURL}
    />
    )}

    {/* TODO: Add a button to book again and view reviews */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        
        <Text style={styles.buttonText}>Leave a Review</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Again</Text>
      </TouchableOpacity>
    </View>

  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 65,      // Set width
    height: 65,     // Set height
    borderRadius: 50,
  },
 buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '65%'
 },
 title: {
  fontSize: 25,
  fontWeight: 'bold',
  marginTop: 15,
  marginBottom: 10,
  marginLeft: 20,
  alignSelf: 'flex-start',
 },
 button: {
  backgroundColor: '#007BFF',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  marginTop: 10,
 },
 buttonText: {
  color: '#fff',
  fontSize: 16,
 },
 container: {
  flexDirection: 'column',
  alignItems: 'center',
 },
 headerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: 20,
 },
 textContainer: {
  justifyContent: 'center',
 },
 welcomeText: {
  color: 'grey',
  fontSize: 25,
 },
 userName: {
  fontWeight: 'bold',
  fontSize: 30,
 },
 profileContainer: {
  alignItems: 'flex-end',
 },
 profilePlaceholder: {
  borderRadius: 50,
  width: 65,
  height: 65,
  backgroundColor: '#ccc',
 },
 cardContainer: {
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  width: '80%',
  height: 'auto',
  marginTop: 20,
  padding: 15,
 },
 parentContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
 },
 leftContainer: {
  flex: 1,
  alignItems: 'center',
 },
 rightContainer: {
  flex: 2,
  paddingLeft: 5,
 },
 additionalContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  borderTopWidth: 1,
  borderTopColor: '#ccc',
 },
 dateContainer: {
  marginBottom: 5,
  marginTop: 10,
  flex: 0.6,
  flexDirection: 'row',
  alignItems: 'flex-start',
 },
 durationContainer: {
  margin: 5,
  flex: 0.4,
  alignItems: 'center',
  flexDirection: 'row',
 },
 dateText: {
  fontSize: 16,
  color: "#000",
  marginLeft: 10,
 },
 durationText: {
  fontSize: 16,
  color: "#000",
  marginLeft: 10,
 },
 name: {
  fontWeight: 'bold',
  fontSize: 23,
  marginBottom: 8,
 },
 jobTitle: {
  color: 'grey',
  fontSize: 18,
 },
 navigationContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 0
 },
 componentContainer: {
  alignItems: 'center',
  padding: 25,
 },
 componentName: {
  fontSize: 17,
  fontWeight: 'bold',
  marginTop: 5,
 },
});

export default Home;