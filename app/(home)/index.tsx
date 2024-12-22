import { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { ScrollView as IOSScrollView } from 'react-native-virtualized-view';
import { useRouter } from 'expo-router';
import AnnouncementsSection from '@/components/home/announcements/AnnouncementSection';
import AppointmentsSection from '@/components/home/appointments/AppointmentSection';
import ServicesSection from '@/components/home/services/ServicesSection';
import ActionSection from '@/components/home/action/ActionSection';
import SearchButton from '@/components/ui/SearchButton';
import { screenDimensions } from '@/utils/screenDimensions';

export default function Home() {
  const [refreshing, setRefreshing] = useState(Boolean);
  const router = useRouter();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={[styles.container]}>
      {refreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color="#7A94FE" />
        </View>
      )}

      <IOSScrollView 
      style={styles.scrollContainer} 
      contentContainerStyle={{ paddingBottom: screenDimensions.screenHeight * 0.03 }} 
      showsVerticalScrollIndicator={false}
      onScroll={({ nativeEvent }) => {
        if (nativeEvent.contentOffset.y < -125) {
          !refreshing && handleRefresh();
        }
      }}
      scrollEventThrottle={16}
    >
      {/* Greeting Section - TODO: Load in authenticated user's forename */}
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Welcome back, <Text style={{ color: '#7A94FE', fontFamily: 'Poppins_600SemiBold'}}>Nathan</Text></Text>
      </View>

      {/* Searchbar Section */}
      <View style={styles.sectionContainer}>
        <SearchButton />
      </View>

      {/* Action Section */}
      <View style={styles.sectionContainer}>
        <ActionSection />
      </View>

      {/* Appointments Section */}
      <View style={styles.sectionContainer}>
        <AppointmentsSection />
      </View>

      {/* Announcements Section */}
      <View style={styles.sectionContainer}>
        <AnnouncementsSection />
      </View>

      {/* Services Section */}
      <View style={styles.sectionContainer}>
        <ServicesSection />
      </View>
      </IOSScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  sectionContainer: {
    marginTop: screenDimensions.screenHeight * 0.0125,
  },
  scrollContainer: {
    paddingHorizontal: screenDimensions.screenWidth * 0.02,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: screenDimensions.screenHeight * 0.50,
    alignItems: 'center',
    zIndex: 1
  },
  title: {
    fontSize: screenDimensions.screenWidth * 0.055,
    fontFamily: 'Poppins_300Light',
    marginTop: 10,
    marginLeft: 15,
  }
});
