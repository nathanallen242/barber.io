import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './contexts/AuthContext';
import AppointmentProvider from './contexts/AppointmentContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import { StyleSheet, View } from 'react-native';
import TabNavigator from './navigators/TabNavigator'; // Import the TabNavigator
import { STRIPE_PUBLISHABLE_KEY } from '@env';

if (__DEV__) {
  const ignoreWarns: string[] = [
    "VirtualizedLists should never be nested inside plain ScrollViews",
    "Sending `onAnimatedValueUpdate` with no listeners registered",
  ];

  const errorWarn: (...args: any[]) => void = global.console.error;
  global.console.error = (...args: any[]) => {
    if (typeof args[0] === 'string') { // Ensure the first argument is a string
      for (const error of ignoreWarns) {
        if (args[0].startsWith(error)) {
          return;
        }
      }
    }
    errorWarn(...args);
  };
}


export default function App() {
 return (
  <AuthProvider>
    <StripeProvider
    publishableKey={STRIPE_PUBLISHABLE_KEY}
    urlScheme="https://expo.dev"
    merchantIdentifier="merchant.com.barber-io" // required for Apple Pay
  >
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
    </StripeProvider>
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