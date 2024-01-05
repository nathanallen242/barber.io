import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ProfileCardProps {
 name: string;
 email: string;
 imageUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, imageUrl }) => {
 return (
  <View style={styles.cardContainer}>
    <View style={styles.parentContainer}>
      <View style={styles.leftContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : (
          <FontAwesome name="user" size={30} color="#000" />
        )}
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <TouchableOpacity>
        <FontAwesome name="pencil" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  </View>
 );
};

const styles = StyleSheet.create({
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
   profilePlaceholder: {
    borderRadius: 50,
    width: 65,
    height: 65,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
   },
   name: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 8,
    marginLeft: 5,
   },
   email: {
    fontSize: 18,
    marginLeft: 5,
   },
 profileImage: {
   borderRadius: 50,
   width: 65,
   height: 65,
 },
});

export default ProfileCard;

