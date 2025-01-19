import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import LottieView from 'lottie-react-native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();
  const { colors, typography } = useThemeStore();
  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LottieView
        source={require('@/assets/animations/404.json')}
        style={styles.animation}
        autoPlay
        loop
      />
      <Text style={[styles.title, { color: colors.primary, fontFamily: typography.fonts.bold }]}>Page Not Found</Text>
      <Text style={[styles.message, { color: colors.secondary, fontFamily: typography.fonts.light }]}>Sorry, the page you are looking for does not exist.</Text>
      <TouchableOpacity style={[styles.button, { borderColor: colors.border }]} onPress={() => router.replace('/(home)/home')}>
        <Text style={[styles.buttonText, { color: colors.text, fontFamily: typography.fonts.bold }]}>Go Home</Text>
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
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
