import React, { useState, useContext, useEffect } from 'react';
import { View, Button, Text, Alert, StyleSheet, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SensitiveInfo from 'react-native-sensitive-info';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { SERVER_URL } from '@env';

interface PaymentsScreenProps {
    navigation: any;
}

const PaymentsScreen: React.FC<PaymentsScreenProps> = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (paymentMethod === 'in-person') {
      Alert.alert('Success', 'Your payment method has been saved.');
      return;
    }

    setProgress(true);
  
    try {
      const response = await axios.post(
        `${SERVER_URL}/create-setup-intent`, 
        JSON.stringify({ email: user?.uid }), 
        {
          headers: {
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true',
          }
        }
      );
    
      if (response.status !== 200) {
        throw new Error('An error occurred while creating the setup intent.');
      }
    
      const { setupIntent, customer_id } = response.data;
    
      // Save setupIntent and customer_id to AsyncStorage
      await SensitiveInfo.setItem('setupIntent', setupIntent, {});
      await SensitiveInfo.setItem('customer_id', customer_id, {});
    
      Alert.alert('Success', 'Your payment method has been saved.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while saving your payment method.');
    } finally {
      setLoading(false);
      setProgress(false);
    }    
   };

   useEffect(() => {
    const getPaymentMethod = async () => {
      const storedMethod = await AsyncStorage.getItem('paymentMethod');
      if (storedMethod !== null) {
        setPaymentMethod(storedMethod);
      }
    };
   
    getPaymentMethod();
  }, []);

  useEffect(() => {
    const savePaymentMethod = async () => {
      if (paymentMethod) {
        await AsyncStorage.setItem('paymentMethod', paymentMethod);
      }
    };

    savePaymentMethod();
  }, [paymentMethod]);


  return (
   <SafeAreaView style={styles.container}>
     <Text style={styles.header}>Payment Options</Text>
     <Text style={styles.options}>Choose your payment method:</Text>
     <View style={styles.paymentOptions}>
       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text style={styles.paymentText}>In-Person</Text>
         <Switch
           trackColor={{ false: "#767577", true: "forestgreen" }}
           thumbColor={paymentMethod === 'in-person' ? "white" : "#f4f3f4"}
           ios_backgroundColor="#3e3e3e"
           onValueChange={() => setPaymentMethod('in-person')}
           value={paymentMethod === 'in-person'}
         />
       </View>
       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
         <Text style={styles.paymentText}>Card</Text>
         <Switch
           trackColor={{ false: "#767577", true: "forestgreen" }}
           thumbColor={paymentMethod === 'card' ? "white" : "#f4f3f4"}
           ios_backgroundColor="#3e3e3e"
           onValueChange={() => setPaymentMethod('card')}
           value={paymentMethod === 'card'}
         />
       </View>
     </View>
     {progress && <ActivityIndicator size="large" color="#0000ff"/>}
     {!loading && <Button title="Save" onPress={handleSubmit} />}
   </SafeAreaView>
  );
};
     
const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  options: {
    fontSize: 20,
    marginBottom: 20,
  },
  paymentOptions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
  },
  paymentText: {
    fontSize: 20,
    marginRight: 10,
  },
  container: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  },
});

export default PaymentsScreen;
