// profile/_layout.tsx
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function ProfileLayout() {
  return (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f0f0f0', // Example header background
          },
          headerTintColor: '#333', // Example header text color
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >

    <Stack.Screen name='index' />
      </Stack>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})