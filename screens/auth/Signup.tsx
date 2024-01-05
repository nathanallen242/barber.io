import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, ActivityIndicator, SafeAreaView, StyleSheet, Alert, View } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import RNPickerSelect from 'react-native-picker-select';

const SignUpScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [role, setRole] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const { createUser } = React.useContext(AuthContext);

 const handleSignUp = async () => {
   setIsLoading(true);
   try {
     await createUser(email, password, role);
     navigation.navigate('Profile');
   } catch (error) {
     console.log(error);
   } finally {
     setIsLoading(false);
   }
 };

 return (
   <SafeAreaView style={styles.container}>
     <TextInput
       style={styles.input}
       placeholder="Email"
       value={email}
       onChangeText={setEmail}
     />
     <TextInput
       style={styles.input}
       placeholder="Password"
       value={password}
       onChangeText={setPassword}
       secureTextEntry
     />
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setRole(value)}
          items={[
            { label: 'Client', value: 'client' },
            { label: 'Barber', value: 'barber' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Select your role", value: null }}
          // @ts-ignore
          Icon={() => <FontAwesomeIcon icon={faChevronDown} size={24} color="gray" />}
        />
      </View>
     
     {isLoading ? (
       <ActivityIndicator size="large" color="#0000ff" />
     ) : (
       <TouchableOpacity onPress={handleSignUp} style={styles.button}>
         <Text style={{color: '#FFFFFF'}}>Sign Up</Text>
       </TouchableOpacity>
     )}
   </SafeAreaView>
 );
};

const styles = StyleSheet.create({
 pickerContainer: {
    width: '80%',
    marginBottom: 10,
    justifyContent: 'center',
  },
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 input: {
   width: '80%',
   height: 40,
   borderColor: 'gray',
   borderWidth: 1,
   marginBottom: 10,
   paddingHorizontal: 10,
 },
 button: {
   backgroundColor: '#007BFF',
   color: '#FFFFFF',
   padding: 10,
   borderRadius: 5,
   alignItems: 'center',
   width: '20%',
   marginTop: 10,
 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 45, // to ensure the text is never behind the icon
    width: '80%',
    marginBottom: 10,
  },
  iconContainer: {
    top: 10,
    right: 90, // Adjust this value as needed
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '80%',
    marginBottom: 10,
  },
});

export default SignUpScreen;