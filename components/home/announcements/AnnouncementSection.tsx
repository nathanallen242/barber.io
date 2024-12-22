import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Advertisement from '@/components/home/announcements/Announcement';
import { screenDimensions } from '@/utils/screenDimensions';
import Carousel from 'pinar';

interface AnnouncementData {
  title: string;
  image: string | number;
}

export default function AnnouncementSection() {
  const ads: AnnouncementData[] = [
    {
      title: 'Special Offer!',
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      title: 'New Services Available',
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      title: 'Health Tips',
      image: require('@/assets/ads/portfolio.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Announcements</Text>
      <Carousel
        showsControls={false}
        height={screenDimensions.screenHeight * 0.28}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
      >
        {ads.map((ad, index) => (
          <View key={index} style={[styles.slide]}>
            <Advertisement title={ad.title} image={ad.image} />
          </View>
        ))}
      </Carousel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_300Light',
    marginBottom: 20,
  },
  slide: {
    // Styles for each slide
    justifyContent: 'center',
    alignItems: 'center',
  },
});
