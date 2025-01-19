import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { useThemeStore } from '@/store/themeStore';
import registrationSuccess from '@/assets/splash/registration-success.png';

export default function Success() {
  const router = useRouter();
  const { user } = useUserStore();
  const { colors, typography } = useThemeStore();

  // Add effect to prevent back navigation
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Prevents going back
    });

    return () => backHandler.remove();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={registrationSuccess} style={styles.image} />
      <Text
        style={[
          styles.title,
          { color: colors.text,
            fontFamily: typography.fonts.bold,
            fontSize: typography.sizes.xxxl },
        ]}
      >
        Registration Successful!
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: colors.text, 
            fontFamily: typography.fonts.light,
            fontSize: typography.sizes.xl },
        ]}
      >
        Thank you for joining us, <Text style= {{ fontFamily: typography.fonts.bold }}>{user?.forename}</Text>!
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => router.replace('/(home)/home')}
      >
        <Text
          style={[
            styles.buttonText,
            { color: colors.button, fontFamily: typography.fonts.medium },
          ]}
        >
          Go Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});
