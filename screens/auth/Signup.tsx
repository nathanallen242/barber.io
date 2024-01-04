import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, ActivityIndicator, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const SignUpScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const { createUser } = React.useContext(AuthContext);

 const handleSignUp = async () => {
   setIsLoading(true);
   try {
     await createUser(email, password);
     navigation.navigate('Login');
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

export default SignUpScreen;