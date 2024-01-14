import React, { useState, useEffect, useContext } from 'react';
import { View, Button, Text, Alert, StyleSheet, SafeAreaView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { CardField, useStripe, CardFieldInput } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/AuthContext';

const PaymentsScreen: React.FC = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [updatingPaymentMethod, setUpdatingPaymentMethod] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [payInPerson, setPayInPerson] = useState(true);
  const [payOnline, setPayOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const savePaymentOption = async () => {
    const paymentOption = payOnline ? 'online' : 'in-person';
    try {
      await AsyncStorage.setItem(`paymentOption_${user?.uid}`, paymentOption);
      Alert.alert('Success', 'Payment option saved!');
    } catch (error) {
      console.error('Error saving payment option:', error);
    }
  };

  // Mock function to fetch Setup Intent Client Secret
  const fetchSetupIntentClientSecret = async (): Promise<string> => {
    // Replace with actual API call
    return 'seti_mockSetupIntentClientSecret';
  };

  // Initialize Payment Sheet for saving card details
  const initializePaymentSheet = async () => {
    try {
      const clientSecret = await fetchSetupIntentClientSecret();

      const { error } = await initPaymentSheet({
        setupIntentClientSecret: clientSecret,
        merchantDisplayName: 'Barber.io',
      });

      if (error) {
        console.error('Error initializing payment sheet:', error);
        Alert.alert('Error', 'Error initializing payment sheet!');
      } else {
        console.log('Payment sheet initialized successfully!');
        setLoading(true);
      } 
    } catch (error) {
        console.error('Error initializing payment sheet:', error);
        Alert.alert('Error', 'Failed to initialize payment sheet!');
      } finally {
        setLoading(false);
      }
  };

  // Handle Save Card button press
  const handleSaveCard = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error: ${error.code}`, error.message);
    } else {
      Alert.alert('Card Details Saved', 'Your card details have been saved successfully!');
    }
  };

  const handleSaveCardDetails = async () => {
    // Here, you would send the cardDetails to your backend
    // which would then interact with Stripe to create a payment method.
    // The backend should return a response indicating success or failure
  };

  const handleUpdatePaymentMethod = async () => {
    setLoading(true);
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error: ${error.code}`, error.message);
      setLoading(false);
    } else {
      // Call the backend to update the payment method
      // The backend should handle the logic to get the latest payment method ID
      try {
        await updatePaymentMethodOnBackend();
        Alert.alert('Success', 'Payment method updated successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to update payment method');
      } finally {
        setLoading(false);
      }
    }
  };
  
  const updatePaymentMethodOnBackend = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('your_backend_endpoint/update-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: user?.uid, // or any other identifier for the user
        }),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to update payment method');
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }
  };
  

  useEffect(() => {
    if (payOnline) {
      initializePaymentSheet();
    }
  }, [payOnline]);

  const togglePayInPerson = () => {
    setPayInPerson(true);
    setPayOnline(false);
  };

  const togglePayOnline = () => {
    setPayInPerson(false);
    setPayOnline(true);
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Payment Options</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox value={payInPerson} onValueChange={togglePayInPerson} />
        <Text style={styles.label}>Pay in-person</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox value={payOnline} onValueChange={togglePayOnline} />
        <Text style={styles.label}>Pay online using card</Text>
      </View>

      {payOnline && (
        <View style={styles.cardContainer}>
          <CardField
            postalCodeEnabled={true}
            placeholders={{ number: '4242 4242 4242 4242' }}
            cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
            style={{ width: '100%', height: 50, marginVertical: 30 }}
            onCardChange={(cardDetails) => setCardDetails(cardDetails)}
          />
        </View>
      )}

      {payOnline && (
    <View style={styles.buttonContainer}>
      <Button onPress={handleSaveCard} title="Save Card" disabled={loading} />
    </View>
    )}

    {payOnline && (
        <View style={styles.buttonContainer}>
        <Button onPress={handleUpdatePaymentMethod} title="Update Payment Method" disabled={loading} />
        </View>
    )}

      <View style={styles.buttonContainer}>
        <Button onPress={savePaymentOption} title="Save Payment Option" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginLeft: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentsScreen;
