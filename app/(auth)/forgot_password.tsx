import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import { screenDimensions } from '../../utils/screenDimensions';
const { screenWidth, screenHeight } = screenDimensions;

// Number of digits in verification code
const VERIFICATION_CODE_LENGTH = 6;
const TIMER_DURATION = 30;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSendOTP = async () => {
    if (!email) return;
    
    try {
      // Add your API call here to send OTP
      // await sendOTP(email);
      setIsEmailSubmitted(true);
      setIsTimerRunning(true);
      setTimer(TIMER_DURATION);
    } catch (error) {
      console.error('Failed to send OTP:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.content, {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom,
          }]}>
            <Text style={styles.logo}>barber.io</Text>

            <View style={styles.illustrationContainer}>
              <Image
                source={require('../../assets/images/letter.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>
              {isEmailSubmitted ? 'Verify your email' : 'Forgot Password'}
            </Text>
            
            {!isEmailSubmitted ? (
              <>
                <Text style={styles.subtitle}>
                  Enter your email address to receive a verification code
                </Text>
                <View style={styles.emailContainer}>
                  <TextInput
                    style={styles.emailInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <TouchableOpacity 
                  style={[styles.sendButton, { backgroundColor: '#7A94FE' }]}
                  onPress={handleSendOTP}
                >
                  <Text style={styles.sendButtonText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.subtitle}>
                  Enter the verification code sent to:
                </Text>
                <View style={styles.emailContainer}>
                  <Text style={styles.email}>{email}</Text>
                </View>

                <OtpInput
                  placeholder="******"
                  numberOfDigits={VERIFICATION_CODE_LENGTH}
                  onFilled={(text) => {
                    console.log('OTP completed:', text);
                    // Add your verification logic here
                  }}
                  focusColor="#7A94FE"
                  autoFocus={true}
                  type="numeric"
                  secureTextEntry={false}
                  theme={{
                    containerStyle: styles.otpContainer,
                    pinCodeContainerStyle: styles.otpInput,
                    pinCodeTextStyle: {
                      fontSize: Math.min(screenWidth * 0.06, 24),
                      color: '#000',
                    },
                    focusedPinCodeContainerStyle: {
                      borderColor: '#7A94FE',
                      borderWidth: 1,
                    },
                  }}
                />

                <TouchableOpacity 
                  onPress={handleSendOTP}
                  disabled={isTimerRunning}
                  style={[
                    styles.sendButton,
                    { backgroundColor: isTimerRunning ? '#F5F5F5' : '#7A94FE' }
                  ]}
                >
                  <Text style={[
                    styles.sendButtonText,
                    { color: isTimerRunning ? '#666' : '#FFFFFF' }
                  ]}>
                    {isTimerRunning 
                      ? `Resend OTP in ${timer}s`
                      : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
  },
  logo: {
    fontSize: Math.min(screenWidth * 0.06, 24),
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Poppins_300Light',
    marginBottom: screenHeight * 0.02,
  },
  illustrationContainer: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    marginBottom: screenHeight * 0.04,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: Math.min(screenWidth * 0.07, 28),
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(screenWidth * 0.04, 16),
    color: '#666',
    marginBottom: screenHeight * 0.03,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.04,
    borderRadius: 8,
    width: '100%',
    marginBottom: screenHeight * 0.04,
  },
  email: {
    fontSize: Math.min(screenWidth * 0.04, 16),
    color: '#333',
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: screenHeight * 0.04,
  },
  codeInput: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: Math.min(screenWidth * 0.06, 24),
    fontWeight: '600',
    color: '#000',
  },
  helpLink: {
    marginBottom: screenHeight * 0.02,
  },
  helpText: {
    color: '#7A94FE',
    fontSize: Math.min(screenWidth * 0.035, 14),
    fontWeight: '500',
  },
  resendButton: {
    paddingVertical: screenHeight * 0.02,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  resendText: {
    color: '#666',
    fontSize: Math.min(screenWidth * 0.035, 14),
    fontWeight: '500',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  emailInput: {
    fontSize: Math.min(screenWidth * 0.04, 16),
    color: '#333',
    width: '100%',
  },
  sendButton: {
    width: '100%',
    paddingVertical: screenHeight * 0.02,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: Math.min(screenWidth * 0.04, 16),
    fontWeight: '500',
  },
  otpContainer: {
    width: '100%',
    marginBottom: screenHeight * 0.04,
  },
  otpInput: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: Math.min(screenWidth * 0.06, 24),
    color: '#000',
  },
}); 