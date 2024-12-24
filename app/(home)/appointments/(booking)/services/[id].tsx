import { useRef, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { screenDimensions } from '@/utils/screenDimensions';
const { screenHeight } = screenDimensions;

export default function ServiceDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
  
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    return (
        <View style={{ flex: 1 }}>
          <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
          >
            <BottomSheetScrollView contentContainerStyle={styles.serviceContainer}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => router.back()}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>Service Details</Text>
              <Text style={styles.id}>ID: {id}</Text>
              <Text style={styles.content}>This is where the service content will appear.</Text>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
  },
  serviceContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    minHeight: screenHeight * 0.5,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  id: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20
  },
  content: {
    fontSize: 16,
    lineHeight: 22
  }
});
