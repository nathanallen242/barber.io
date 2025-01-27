import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationButton } from '@/components/ui/NavigationButton';
import { useThemeStore } from '@/store/themeStore';
import { screenDimensions } from '@/utils/screenDimensions';
const { screenWidth, screenHeight } = screenDimensions;

export default function Landing() {
  const { colors, typography } = useThemeStore();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.content}>

        {/* Logo/Title Section */}
        <View style={styles.titleContainer}>
          <Text style={[styles.logo, { fontFamily: typography.fonts.light }]}>barber.io</Text>
        </View>

        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('@/assets/splash/landing-page-salon.png')} 
            style={styles.illustration}
            contentFit="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={[styles.heading, { fontFamily: typography.fonts.light }]}>Your Barbershop. <Text style={{ fontFamily: typography.fonts.bold }}>Anywhere.</Text></Text>
          <Text style={[styles.subheading, { fontFamily: typography.fonts.light, color: '#FFFFF' }]}>
            Join or log in to book your next haircut!
          </Text>
        </View>

        {/* Button Group */}
        <View style={styles.buttonContainer}>
          <NavigationButton to="/(auth)/register" variant="primary" style={styles.button}>
            Sign Up
          </NavigationButton>
          <NavigationButton to="/(auth)/login" variant="primary" style={styles.button}>
            Log In
          </NavigationButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 50,
  },
  logo: {
    fontSize: screenDimensions.min(0.06, 24),
    color: '#000000',
  },
  illustrationContainer: {
    position: 'absolute',
    top: screenHeight * 0.1,
    left: 0,
    right: 0,
    height: screenHeight * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  illustration: {
    height: '100%',
    width: screenWidth * 0.8,
    aspectRatio: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    marginTop: screenHeight * 0.05
  },
  heading: {
    fontSize: screenDimensions.min(0.09, 40),
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
    color: '#000000',
  },
  subheading: {
    fontSize: screenDimensions.min(0.05, 20),
    textAlign: 'center',
    marginBottom: screenHeight * 0.04,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: screenWidth * 0.06,
    paddingBottom: screenHeight * 0.05,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    width: '60%',
    marginBottom: screenHeight * 0.02,
  },
});
