import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';

const Update: React.FC = () => {
 const { user } = useContext(AuthContext);

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Bio-data</Text>
     <View style={styles.imageContainer}>
       {user?.photoURL ? (
         <Image source={{ uri: user.photoURL }} style={styles.image} />
       ) : (
         <FontAwesome name="user" size={100} color="#000" />
       )}
     </View>
     <View style={styles.textContainer}>
       <Text style={styles.name}>{user?.displayName}</Text>
       <Text style={styles.email}>{user?.email}</Text>
     </View>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
 },
 imageContainer: {
   width: 100,
   height: 100,
   borderRadius: 50,
   overflow: 'hidden',
   marginBottom: 20,
 },
 image: {
   width: '100%',
   height: '100%',
 },
 textContainer: {
   flexDirection: 'column',
   alignItems: 'center',
 },
 name: {
   fontSize: 18,
   fontWeight: 'bold',
 },
 email: {
   fontSize: 16,
   color: 'gray',
 },
});

export default Update;