import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './contexts/AuthContext';
import AppointmentProvider from './contexts/AppointmentContext';
import { StyleSheet, View } from 'react-native';
import TabNavigator from './navigators/TabNavigator'; // Import the TabNavigator

export default function App() {
 return (
  <AuthProvider>
    <AppointmentProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          <NavigationContainer>
            <TabNavigator username="Guest" />
          </NavigationContainer>
        </View>
        <StatusBar style="auto" />
      </View>
    </AppointmentProvider>
  </AuthProvider>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "white",
 },
 content: {
  flex: 1,
 },
});