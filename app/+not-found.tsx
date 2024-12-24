import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <View style={styles.container}>
        <LottieView
        source={require('@/assets/animations/404.json')}
        style={styles.animation}
        autoPlay
        loop
      />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.message}>Sorry, the page you are looking for does not exist.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(home)/home')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
    color: '#7A94FE',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Poppins_300Light',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
    color: '#7A94FE',
    textAlign: 'center',
  },
});
