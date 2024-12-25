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

export default function GalleryCard({ service }: ServiceData) {
  return (
    <TouchableOpacity onPress={() => { /* TODO: Handle press to dynamic screen for service ID */}}>
      <View style={styles.cardContainer}>
        <Image 
          source={typeof service.image === 'string' ? { uri: service.image } : service.image}
          style={styles.image} 
        />
        <View style={styles.overlay}>
          <Text style={styles.barberName}>{service.name}</Text>
          <Text style={styles.date}>{service.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    borderWidth: 0.5,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 135,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginHorizontal: 8,
    marginTop: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  barberName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  date: {
    color: '#E0E0E0',
    fontSize: 12,
    fontFamily: 'Poppins_300Light',
    marginTop: 4,
  }
});
