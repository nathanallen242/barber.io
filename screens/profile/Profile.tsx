import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileCard from '../../components/profile/ProfileCard';

const Profile: React.FC = () => {
 return (
   <>
     <View style={styles.header}>
       <Text style={styles.title}>Profile</Text>
     </View>
     <View style={styles.container}>
       <ProfileCard name="example" email="example@email.com" />
     </View>
   </>
 );
};

const styles = StyleSheet.create({
 header: {
   flexDirection: 'row',
   justifyContent: 'flex-start',
   alignItems: 'center',
   marginTop: 60,
   marginLeft: 40,
 },
 container: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'center',
 },
 title: {
   fontSize: 30,
   fontWeight: 'bold',
 },
});

export default Profile;