import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OfferingProps {
  id: string;
  name: string;
  price: number;
  imageSource?: any;
}

const Offering: React.FC<OfferingProps> = ({ id, name, price, imageSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource || require('@/assets/images/illustration.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.serviceName}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

export default Offering;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  serviceName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontFamily: 'Poppins_300Light',
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    marginLeft: 12,
  },
});
