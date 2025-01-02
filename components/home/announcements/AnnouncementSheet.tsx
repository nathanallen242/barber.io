import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Easing } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import Portal from '@gorhom/bottom-sheet';
import { useThemeStore } from '@/store/themeStore';

interface AnnouncementSheetProps {
  title: string;
  image: string | number;
  description: string;
  isVisible: boolean;
  onClose: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 200;

export default function AnnouncementSheet({
  title,
  image,
  description,
  isVisible,
  onClose,
}: AnnouncementSheetProps) {
  const { colors, typography } = useThemeStore();

  // Configure animation timing
  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 250,
    easing: Easing.exp,
  });

  // Configure snap points
  const snapPoints = useMemo(() => ['70%'], []);

  // Handle sheet changes
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <Portal>
        <BottomSheet
        ref={bottomSheetRef}
        enablePanDownToClose
        index={isVisible ? 0 : -1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        animationConfigs={animationConfigs}
        backgroundStyle={{
            backgroundColor: colors.background,
        }}
        >
        <View style={styles.contentContainer}>
            <Text style={[
            styles.title,
            {
                color: colors.text,
                fontFamily: typography.fonts.bold,
                fontSize: typography.sizes.xxl,
            }
            ]}>
            {title}
            </Text>

            <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={[
                styles.image,
                {
                borderColor: colors.border,
                }
            ]}
            resizeMode="cover"
            />

            <Text style={[
            styles.description,
            {
                color: colors.subtext,
                fontFamily: typography.fonts.regular,
                fontSize: typography.sizes.md,
            }
            ]}>
            {description}
            </Text>
        </View>
        </BottomSheet>
    </Portal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: SCREEN_WIDTH - 32, // Full width minus padding
    height: IMAGE_HEIGHT,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  description: {
    lineHeight: 24,
  },
});