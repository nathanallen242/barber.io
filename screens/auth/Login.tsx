import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, ActivityIndicator, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const { login } = React.useContext(AuthContext);

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
    {/* Other components... */}
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

export default LoginScreen;