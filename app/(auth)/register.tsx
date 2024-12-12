import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenDimensions } from '../../utils/screenDimensions';
const { screenWidth, screenHeight } = screenDimensions;

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const insets = useSafeAreaInsets(); // Get safe area insets

  const validateForm = () => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // Sign up logic would go here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Content Adjusted for Safe Area */}
      <View
        style={{
          ...styles.content,
          paddingTop: insets.top + 20, // Add safe area padding + extra space
          paddingBottom: insets.bottom,
        }}
      >
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Welcome to our platform!</Text>

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          error={errors.email}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          error={errors.password}
          secureTextEntry
          placeholder="Enter your password"
        />

        <Input
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          error={errors.confirmPassword}
          secureTextEntry
          placeholder="Confirm your password"
        />

        <Button onPress={handleSignUp}>Sign up</Button>

        <Text style={styles.orText}>Or continue with</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/icons/google-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/icons/facebook-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/icons/apple-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
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
    paddingHorizontal: screenWidth * 0.06, // 6% horizontal padding
    justifyContent: 'center',
  },
  title: {
    fontSize: Math.min(screenWidth * 0.08, 32), // Responsive font size with max limit
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
  },
  subtitle: {
    fontSize: Math.min(screenWidth * 0.04, 16),
    color: '#666',
    marginBottom: screenHeight * 0.04,
  },
  orText: {
    textAlign: 'center',
    color: '#666',
    fontSize: Math.min(screenWidth * 0.035, 14),
    marginVertical: screenHeight * 0.02,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: screenWidth * 0.04,
    marginBottom: screenHeight * 0.03,
  },
  socialButton: {
    width: screenWidth * 0.11,
    height: screenWidth * 0.11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  footerText: {
    color: '#666',
    fontSize: Math.min(screenWidth * 0.035, 14),
  },
  footerLink: {
    color: '#7A94FE',
    fontWeight: '600',
    fontSize: Math.min(screenWidth * 0.035, 14),
  },
});
