import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './navigators/TabNavigator'; // Import the TabNavigator

export default function App() {
 return (
  <View style={styles.container}>
    <View style={styles.content}>
      <NavigationContainer>
        <TabNavigator username="Nathan" />
      </NavigationContainer>
    </View>
    <StatusBar style="auto" />
  </View>
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