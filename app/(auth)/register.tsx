import { View, StatusBar, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useThemeStore } from '@/store/themeStore';
import { screenDimensions } from '@/utils/screenDimensions';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { UserProfile } from '@/types/models';
import { router } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Switch } from '@rneui/themed';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';

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
  forename: Yup.string()
    .required('First name is required'),
  surname: Yup.string()
    .required('Last name is required'),
  country: Yup.string()
    .required('Country is required')
    .nullable()
});

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  forename: string;
  surname: string;
  role: Role;
  country: CountryCode;
}

enum Role {
  Client = "client",
  Barber = "barber"
}

 /* Error suppression for react-native-country-picker: defaultProps warning   */
 const error = console.error;
 console.error = (...args: any) => {
   if (/defaultProps/.test(args[0])) return;
   error(...args);
 };

export default function Register() {
  const insets = useSafeAreaInsets();
  const { typography } = useThemeStore();

  const initialValues: FormValues = {
    forename: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: Role.Client,
    country: 'US'
  };

  
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          ...styles.content,
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
        }}
      >
        <Text style={[styles.title, { fontFamily: typography.fonts.bold, fontSize: typography.sizes.xxxl }]}>Register</Text>
        <Text style={[styles.subtitle, { fontFamily: typography.fonts.regular, fontSize: typography.sizes.lg }]}>Welcome to our platform!</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data: { user, session }, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                  data: {
                    forename: values.forename,
                    surname: values.surname,
                    email: values.email,
                    job_role: values.role,
                    country: values.country
                  }
                }
              });

              setSubmitting(false);

              if (error) {
                Alert.alert("Registration Failed!", error.message);
                return;
              }

              if (user && session) {
                const userProfile: UserProfile = {
                  ...user,
                  forename: user.user_metadata.forename,
                  surname: user.user_metadata.surname,
                  job_role: values.role,
                  country: values.country,
                };
                useUserStore.setState({ user: userProfile, session });
                router.replace("/(auth)/success");
              }

            } catch (err: any) {
              setSubmitting(false);
              Alert.alert("Registration Failed!", err.message || 'Something went wrong.');
            }
          }}
        >
          {({ handleChange, handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
            <>
              {/* Name Fields Row */}
              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <Input
                    label="First Name"
                    value={values.forename}
                    onChangeText={handleChange('forename')}
                    error={touched.forename ? errors.forename : undefined}
                    iconName="person"
                  />
                </View>
                <View style={styles.halfWidth}>
                  <Input
                    label="Last Name"
                    value={values.surname}
                    onChangeText={handleChange('surname')}
                    error={touched.surname ? errors.surname : undefined}
                    iconName="person-outline"
                  />
                </View>
              </View>

              {/* Role and Country Row */}
              <View style={styles.row}>
                <View style={styles.roleContainer}>
                <Text style={{ fontFamily: typography.fonts.regular }}>Role</Text>
                  <View style={styles.roleToggle}>
                  <Text style={[values.role === Role.Client ? styles.activeRole : styles.inactiveRole,
                      { fontFamily: typography.fonts.regular }
                    ]}>
                      Client
                    </Text>
                    <Switch
                      value={values.role === Role.Barber}
                      onValueChange={(value) => 
                        void setFieldValue('role', value ? Role.Barber : Role.Client)
                      }
                    />
                    <Text style={[values.role === Role.Barber ? styles.activeRole : styles.inactiveRole,
                      { fontFamily: typography.fonts.regular }
                    ]}>
                      Barber
                    </Text>
                  </View>
                </View>

                <View style={styles.countryContainer}>
                  <Text style={{ fontFamily: typography.fonts.regular }}>Country of Origin</Text>
                  <CountryPicker
                    withFlag={true}
                    withFilter={true}
                    withCountryNameButton={true}
                    withAlphaFilter={true}
                    withCallingCode={false}
                    withCurrency={false}
                    withEmoji={true}
                    withModal={true}
                    visible={false}
                    countryCode={values.country || 'US'}
                    onSelect={(country: Country) => {
                      void setFieldValue('country', country.cca2);
                    }}
                  />
                </View>
              </View>

              <Input
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                error={touched.email ? errors.email : undefined}
                iconName="mail"
              />

              <Input
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                error={touched.password ? errors.password : undefined}
                secureTextEntry
                iconName="lock-closed"
              />

              <Input
                label="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                error={touched.confirmPassword ? errors.confirmPassword : undefined}
                secureTextEntry
                iconName="lock-closed-outline"
              />

              <Button onPress={handleSubmit}>
                {isSubmitting ? <ActivityIndicator color="#ffffff" /> : 'Sign up'}
              </Button>

              <TouchableOpacity 
                style={styles.loginLink} 
                onPress={() => router.replace('/(auth)/login')}
              >
                <Text style={[styles.loginText, { fontFamily: typography.fonts.regular }]}>
                  Already have an account? <Text style={styles.loginTextHighlight}>Log in</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* <Text style={[styles.orText, { fontFamily: typography.fonts.regular }]}>Or continue with</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('@/assets/icons/google-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('@/assets/icons/facebook-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('@/assets/icons/apple-icon.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View> */}
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
  row: {
    flexDirection: 'row',
    gap: screenWidth * 0.04,
    marginBottom: screenHeight * 0.02,
  },
  halfWidth: {
    flex: 1,
  },
  roleContainer: {
    flex: 1,
  },
  countryContainer: {
    flex: 1,
  },
  roleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  roleToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  activeRole: {
    color: '#000',
    fontWeight: '600',
  },
  inactiveRole: {
    color: '#666',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginTextHighlight: {
    color: '#054A72',
    fontWeight: '600',
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
    width: screenWidth * 0.10,
    height: screenWidth * 0.10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
  },
});