import { View, StatusBar, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { screenDimensions } from '@/utils/screenDimensions';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { screenWidth, screenHeight } = screenDimensions;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords do not match')
    .required('Confirm Password is required'),
});

export default function Register() {
  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          ...styles.content,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
        }}
      >
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Welcome to our platform!</Text>

        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data: { user, session }, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
              });

              setSubmitting(false);

              if (error) {
                Alert.alert(
                  "Registration Failed!",
                  error.message,
                  [{ text: "OK" }],
                  { cancelable: true }
                );
                return;
              }

              if (user && session) {
                useUserStore.setState({ user, session });
                Alert.alert(
                  "Registration Successful!",
                  "Welcome aboard!",
                  [{ text: "OK", onPress: () => router.replace("/") }],
                  { cancelable: true }
                );
              }

            } catch (err: any) {
              setSubmitting(false);
              Alert.alert(
                "Registration Failed!",
                err.message || 'Something went wrong.',
                [{ text: "OK" }],
                { cancelable: true }
              );
            }
          }}
        >
          {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <Input
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                error={touched.email ? errors.email : undefined}
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                error={touched.password ? errors.password : undefined}
                secureTextEntry
                placeholder="Enter your password"
              />

              <Input
                label="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
                secureTextEntry
                placeholder="Confirm your password"
              />

              <Button onPress={handleSubmit}>
                {isSubmitting ? <ActivityIndicator color="#ffffff" /> : 'Sign up'}
              </Button>
            </>
          )}
        </Formik>

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
