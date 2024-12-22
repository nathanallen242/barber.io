import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ServiceData {
  service: {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    image?: string | number;
  };
}

export default function ServiceCard({ service }: ServiceData) {
  return (
    <TouchableOpacity onPress={() => { /* TODO: Handle press to dynamic screen for service ID */}}>
      <View style={styles.cardContainer}>
        <Image 
          source={typeof service.image === 'string' ? { uri: service.image } : service.image}
          style={styles.image} 
        />
        <Text style={styles.title}>{service.name}</Text>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" style={{ marginTop: 5, marginLeft: 5}}/>
          <Text style={styles.description}>{service.description}</Text>
        </View>
        <Text style={styles.price}>${service.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 140,
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginHorizontal: 8,
    marginTop: 8,
  },
  description: {
    fontSize: 12,
    color: '#8A8A8A',
    fontFamily: 'Poppins_300Light',
    marginHorizontal: 4,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 8,
  },
});
