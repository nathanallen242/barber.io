import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { screenDimensions } from '@/utils/screenDimensions';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
const { screenWidth, screenHeight } = screenDimensions;

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      setIsLoading(false);

      if (error) {
        Alert.alert("Login Failed!", error.message); return;
      }

      if (user && session) {
        useUserStore.setState(({
          user: user,
          session: session
        }));
        Alert.alert(
          "Login Successful!",
          "Welcome aboard!",
          [{ text: "OK", onPress: () => {
            console.log("Success acknowledged");
            router.replace("/(home)/home")
          } }],
          { cancelable: true }
        );
  
      }
    }
    catch {
      setIsLoading(false);
      Alert.alert(
        "Login Error",
        "An unexpected error occurred",
        [{ text: "OK", onPress: () => console.log("Catch error acknowledged") }],
        { cancelable: true }
      );
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* Content Adjusted for Safe Area */}
      <View
        style={{
          ...styles.content,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
        }}
      >
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back to our platform!</Text>

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

        <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>

        <Button onPress={handleLogin}>
          {isLoading ? <ActivityIndicator color="#ffffff" /> : 'Login'}
        </Button>

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
    paddingHorizontal: screenWidth * 0.06,
    justifyContent: 'center',
  },
  title: {
    fontSize: Math.min(screenWidth * 0.08, 32),
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
  },
  subtitle: {
    fontSize: Math.min(screenWidth * 0.04, 16),
    color: '#666',
    marginBottom: screenHeight * 0.04,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: screenHeight * 0.02,
  },
  forgotPasswordText: {
    color: '#7A94FE',
    fontSize: Math.min(screenWidth * 0.035, 14),
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

