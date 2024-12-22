import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ServiceCard from '@/components/home/services/Services';
import { Service } from '@/types/models';

interface ServiceWithImage extends Service {
  image: string;
}

export default function ServicesSection() {
  const services: ServiceWithImage[] = [
    {
      id: '1',
      category: 'Hair',
      description: '45 mins',
      name: 'Haircut',
      price: 90,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '2',
      category: 'Massage',
      description: '60 mins',
      name: 'Massage',
      price: 60,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '3',
      category: 'Hair',
      description: '45 mins',
      name: 'Haircut',
      price: 90,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '4',
      category: 'Hair',
      description: '45 mins',
      name: 'Haircut',
      price: 90,
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      id: '5',
      category: 'Hair',
      description: '45 mins',
      name: 'Haircut',
      price: 90,  
      image: require('@/assets/ads/portfolio.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gallery</Text>
      <FlatList
        data={services}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ServiceCard service={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: 'Poppins_300Light',
    marginLeft: 15,
    marginBottom: 20,
  },
  listContainer: {
    paddingLeft: 16,
  },
  separator: {
    width: 1,
    backgroundColor: '#ddd', 
    marginHorizontal: 8,
  },
});