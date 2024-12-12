import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationButton } from '../../components/ui/NavigationButton';
import { screenDimensions } from '../../utils/screenDimensions';

const { screenWidth, screenHeight } = screenDimensions;

export default function Landing() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Logo/Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.logo}>barber.io</Text>
        </View>

        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/images/illustration.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.heading}>Your Barbershop. Anywhere.</Text>
          <Text style={styles.subheading}>
            Join or log in to book your next haircut!
          </Text>
        </View>

        {/* Button Group */}
        <View style={styles.buttonContainer}>
          <NavigationButton to="/(auth)/register" variant="primary" style={styles.button}>
            Sign Up
          </NavigationButton>
          <NavigationButton to="/(auth)/login" variant="secondary" style={styles.button}>
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
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    fontSize: screenDimensions.min(0.06, 24),
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins_300Light',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.05,
    marginBottom: screenHeight * 0.05,
  },
  heading: {
    fontSize: screenDimensions.min(0.1, 40),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
    color: '#000000',
    fontFamily: 'Poppins_500Medium',
  },
  subheading: {
    fontSize: screenDimensions.min(0.05, 20),
    textAlign: 'center',
    color: '#666666',
    marginBottom: screenHeight * 0.04,
    fontFamily: 'Poppins_300Light',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: screenWidth * 0.06,
    paddingBottom: screenHeight * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: screenWidth * 0.03,
  },
  button: {
    borderRadius: 10,
    flex: 1,
  },
});
