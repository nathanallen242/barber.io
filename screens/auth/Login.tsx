import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, ActivityIndicator, SafeAreaView, Alert, StyleSheet, View } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGoogle, faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const { login, handleLoginGoogle } = React.useContext(AuthContext);

 const handleLogin = async () => {
   setIsLoading(true);
   try {
     await login(email, password);
     navigation.navigate('Profile');
   } catch (error) {
     console.log(error);
     Alert.alert("Authentication Error", "Invalid email and/or password.");
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
       <TouchableOpacity onPress={handleLogin} style={styles.button}>
         <Text style={{color: '#FFFFFF'}}>Login</Text>
       </TouchableOpacity>
     )}
     <View style={styles.socialButtonsContainer}>
       <TouchableOpacity style={styles.socialButton}
       onPress={handleLoginGoogle}>
         <FontAwesomeIcon icon={faGoogle} size={30} color="#4285F4" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.socialButton}>
         <FontAwesomeIcon icon={faFacebookF} size={30} color="#3b5998" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.socialButton}>
         <FontAwesomeIcon icon={faGithub} size={30} color="#3b5998" />
       </TouchableOpacity>
     </View>
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
 socialButtonsContainer: {
   flexDirection: 'row',
   justifyContent: 'center',
   marginTop: 40,
 },
 socialButton: {
   marginHorizontal: 10,
 },
});

export default LoginScreen;