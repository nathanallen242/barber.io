import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Advertisement from '@/components/home/announcements/Announcement';
import { screenDimensions } from '@/utils/screenDimensions';
import { useThemeStore } from '@/store/themeStore';
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
      title: 'Self Care Tips',
      image: require('@/assets/ads/portfolio.jpg'),
    },
    {
      title: 'How to Fade 101',
      image: require('@/assets/ads/portfolio.jpg'),
    },
  ];

  const { colors } = useThemeStore();

  return (
    <View>
      <View style={styles.textBlock}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Announcements</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
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
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_300Light',
    marginLeft: 15,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    marginBottom: 20,
  },
  viewAll: {
    fontFamily: 'Poppins_300Light',
    fontSize: 18,
    color: 'skyblue',
  }
});
