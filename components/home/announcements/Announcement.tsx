import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions
} from 'react-native';
import { ImageBackground } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '@/store/themeStore';

interface AnnouncementProps {
  id: string;
  title: string;
  image: string | number;
  description: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Announcement({ id, title, image, description }: AnnouncementProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, sharedColors, typography } = useThemeStore();

  const handleOpen = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={handleOpen}>
        <ImageBackground
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.adContainer}
          
        >
          <View style={styles.overlay}>
            <Text style={[styles.title, { 
              fontFamily: typography.fonts.bold,
              color: sharedColors.white }]}>{title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={handleClose}
      >
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <View />
        </Pressable>

        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close-circle-outline" size={24} color={colors.icon} />
            </TouchableOpacity>

            <Text
              style={[
                styles.modalTitle,
                {
                  color: colors.text,
                  fontFamily: typography.fonts.medium,
                  fontSize: typography.sizes.xxl,
                },
              ]}
            >
              {title}
            </Text>

            <ImageBackground
              source={typeof image === 'string' ? { uri: image } : image}
              style={[
                styles.modalImage,
                {
                  borderColor: colors.border,
                },
              ]}
              resizeMode="cover"
            />

            <Text
              style={[
                styles.modalDescription,
                {
                  color: colors.subtext,
                  fontFamily: typography.fonts.regular,
                  fontSize: typography.sizes.md,
                },
              ]}
            >
              {description}
            </Text>
          </View>
        </View>
      </Modal>
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
    fontSize: 18,
    textAlign: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalView: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  modalDescription: {
    textAlign: 'left',
    lineHeight: 22,
  },
});
