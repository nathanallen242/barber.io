import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AnnouncementSheet from '@/components/home/announcements/AnnouncementSheet';
import { useState } from 'react';

interface AnnouncementProps {
  title: string;
  image: string | number;
  description: string;
}

export default function Announcement({ title, image, description }: AnnouncementProps) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => {
        console.log('Announcement clicked');
        setIsBottomSheetVisible(true);
      }}>
        <ImageBackground source={typeof image === 'string' ? { uri: image } : image} style={styles.adContainer}>
          <View style={styles.overlay}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <AnnouncementSheet
      title={title}
      image={image}
      description={description}
      isVisible={isBottomSheetVisible}
      onClose={() => setIsBottomSheetVisible(false)}
      />
  </>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    width: 350,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
  },
});
