import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Offering from '@/components/booking/Offering';

const services = [
  { id: '1', name: 'Basic Haircut', price: 20, description: 'A simple haircut to maintain your current style.' },
  { id: '2', name: 'Premium Haircut', price: 30, description: 'A detailed haircut with styling and finishing touches.' },
  { id: '3', name: 'Beard Trim', price: 15, description: 'Professional beard shaping and trimming.' },
  { id: '4', name: 'Hair Coloring', price: 50, description: 'Full or partial hair coloring with quality products.' },
  { id: '5', name: 'Shampoo & Style', price: 25, description: 'Relaxing shampoo followed by a stylish blow-dry.' },
];


export default function ServiceSelection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const router = useRouter();

  const handlePress = (id: string) => {
    setSelectedService(id === selectedService ? null : id);
  };

  const handleLongPress = (id: string) => {
    router.push({ pathname: '/(home)/appointments/(booking)/services/[id]', params: { id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now, choose one that fits your needs:</Text>
      <View style={styles.listContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            onPress={() => handlePress(service.id)}
            onLongPress={() => handleLongPress(service.id)}
          >
            <Offering
              id={service.id}
              name={service.name}
              price={service.price}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginVertical: 50,
    color: '#333',
  },
  listContainer: {
    flexGrow: 1,
  },
  pressableContainer: {
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
  },
  selectedContainer: {
    backgroundColor: '#DDE7FF',
  },
});
