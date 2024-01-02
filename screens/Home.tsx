import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomeProps {
 username: string;
}

const Home: React.FC<HomeProps> = ({ username }) => {
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  // Simulate scroll & fetch (TODO)
  setTimeout(() => {
   setLoading(false);
  }, 2000);
  }, []);

 return (
  <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <Text style={styles.userName}>{username}</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profilePlaceholder}></View>
      </View>
    </View>

    <View style={styles.cardContainer}>
      <View style={styles.parentContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.profilePlaceholder}></View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.jobTitle}>Software Engineer</Text>
        </View>
      </View>

      <View style={styles.additionalContainer}>
        <View style={styles.dateContainer}>
          <FontAwesome name="calendar" size={15} color="#000" />
          <Text style={styles.dateText}>Tuesday, 2 January</Text>
        </View>
        <View style={styles.durationContainer}>
          <FontAwesome name="clock-o" size={15} color="#000" />
          <Text style={styles.durationText}>00:00 - 00:00</Text>
        </View>
      </View>
    </View>

    {/* Additional Components can be added here */}
  </SafeAreaView>
 );
};

const styles = StyleSheet.create({
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
  fontSize: 20,
 },
 jobTitle: {
  color: 'grey',
  fontSize: 16,
 },
});

export default Home;