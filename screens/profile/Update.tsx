import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext, User } from '../../contexts/AuthContext';
import PhoneInput from 'react-native-phone-input';
import * as ImagePicker from 'expo-image-picker';

const Update: React.FC = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [localPhotoURL, setLocalPhotoURL] = useState<string | undefined>(user?.photoURL);
    const [displayName, setDisplayName] = useState<string | undefined>(user?.displayName);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(user?.phoneNumber);
  
    const handleProfileImageUpdate = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        Alert.alert("Access Denied", "You've refused to allow this app to access your photos!");
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
  
      if (pickerResult.canceled) {
        return;
      }

    const pickedUri = pickerResult.assets && pickerResult.assets[0].uri;
    if (user && pickedUri) {
      setLocalPhotoURL(pickedUri);
      const updatedUser: User = { ...user, photoURL: pickedUri };
      updateUserProfile(updatedUser);
    }
    };

    const handleUpdate = () => {
        if (user) {
            const updatedUser: User = {
                ...user,
                displayName: displayName || user.displayName,
                phoneNumber: phoneNumber || user.phoneNumber,
            };
            updateUserProfile(updatedUser);
            }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Bio-data</Text>
        <TouchableOpacity style={styles.imageContainer} onPress={handleProfileImageUpdate}>
          {localPhotoURL ? (
            <Image source={{ uri: localPhotoURL }} style={styles.image} />
          ) : (
            <FontAwesome name="user" size={100} color="#000" />
          )}
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{user?.displayName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <View style={styles.inputContainer}>
               <TextInput
                  style={styles.input}
                  placeholder="What's your display name?"
                  value={displayName}
                  onChangeText={(text) => setDisplayName(text)}
               />
               <TextInput
                  style={styles.input}
                  placeholder={user?.role || "Role"}
                  value={user?.role}
                  editable={false}
                  placeholderTextColor="gray"
               />
               <TextInput
                  style={styles.input}
                  placeholder="What's your phone number?"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
               />
               {/* <PhoneInput
                ref={phoneInputRef}
                initialCountry={'us'}
                initialValue="1234567890"
                textProps={{
                    placeholder: 'Enter a phone number...'
                }}
            />  */}
           </View>
           <TouchableOpacity onPress={handleUpdate} style={styles.button}>
               <Text>Update</Text>
          </TouchableOpacity>
       </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '20%',
    marginTop: 10,
},
 container: {
   flex: 1,
   flexDirection: 'column',
   alignItems: 'center',
 },
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   marginTop: 20,
 },
 imageContainer: {
   width: 100,
   height: 100,
   borderRadius: 50,
   overflow: 'hidden',
   marginTop: 20,
 },
 image: {
   width: '100%',
   height: '100%',
 },
 textContainer: {
   marginTop: 20,
   flexDirection: 'column',
   alignItems: 'center',
 },
 name: {
   fontSize: 22,
   fontWeight: 'bold',
 },
 email: {
   fontSize: 18,
   color: 'gray',
 },
 inputContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
},
input: {
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    borderWidth: 1,
    marginBottom: 10, // Added bottom margin
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
    width: 220,
    height: 40,
},
});

export default Update;