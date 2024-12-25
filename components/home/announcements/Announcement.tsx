import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

interface AnnouncementProps {
  title: string;
  image: string | number;
}

export default function Announcement({ title, image }: AnnouncementProps) {
  return (
    <TouchableOpacity onPress={() => { /* Handle press action here */ }}>
      <ImageBackground source={typeof image === 'string' ? { uri: image } : image} style={styles.adContainer}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
