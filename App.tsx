import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './contexts/AuthContext';
import AppointmentProvider from './contexts/AppointmentContext';
import { StyleSheet, View } from 'react-native';
import TabNavigator from './navigators/TabNavigator'; // Import the TabNavigator

if (__DEV__) {
 const ignoreWarns = [
   "VirtualizedLists should never be nested inside plain ScrollViews",
   "Sending `onAnimatedValueUpdate` with no listeners registered"
 ];

 const errorWarn = global.console.error;
 global.console.error = (...arg) => {
   for (const error of ignoreWarns) {
     if (arg[0].startsWith(error)) {
       return;
     }
   }
   errorWarn(...arg);
 };
}

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