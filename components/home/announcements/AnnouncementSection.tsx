import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Announcement from '@/components/home/announcements/Announcement';
import { screenDimensions } from '@/utils/screenDimensions';
import { useThemeStore } from '@/store/themeStore';
import announcements from '@/data/announcements';
import Carousel from 'pinar';

export default function AnnouncementSection() {
  const { colors } = useThemeStore();

  return (
    <View>
      <View style={styles.textBlock}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Announcements</Text>
      </View>
      <Carousel
        showsControls={false}
        height={screenDimensions.screenHeight * 0.28}
        autoplay={true}
        autoplayInterval={3000}
        loop={true}
      >
        {announcements.map((ad, index) => (
          <View key={index} style={[styles.slide]}>
            <Announcement title={ad.title} image={ad.image} description={ad.description} />
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
  }
});
