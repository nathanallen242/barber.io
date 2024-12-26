import { useRef, useMemo } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { screenDimensions } from '@/utils/screenDimensions';

const { screenHeight } = screenDimensions;

export default function NotificationDetails() {
  const router = useRouter();
  const { colors, typography } = useThemeStore();
  const { id } = useLocalSearchParams();

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        ref={sheetRef}
        backgroundComponent={() => (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: colors.card,
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14,
            }}
          />
        )}
        index={1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        backdropComponent={() => (
            <View style={styles.backdrop} />
          )}
        handleIndicatorStyle={{ backgroundColor: colors.text }}
        
      >
        <BottomSheetScrollView 
        contentContainerStyle={[styles.notificationContainer]}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={typography.sizes.xxl} color={colors.icon} />
          </TouchableOpacity>
          <Text style={[styles.title, { fontFamily: typography.fonts.medium, color: colors.text }]}>Notification Details</Text>
          <Text style={styles.date}>ID: {id}</Text>
          <Text style={styles.content}>This is where the notification content will appear.</Text>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    minHeight: screenHeight * 0.5
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 40
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20
  },
  content: {
    fontSize: 16,
    lineHeight: 22
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});
