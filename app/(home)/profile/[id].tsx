// profile/index.tsx
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { useUserStore } from '@/store/userStore';
import { useHandleLogOut } from '@/lib/auth';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Setting } from '@/components/profile/Setting';

export default function ProfileScreen() {
    const router = useRouter();
    const { user } = useUserStore();
    const handleLogout = useHandleLogOut();
    const { colors, typography } = useThemeStore();
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    
    return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Picture */}
      <View style={styles.imageContainer}>
      <Image
        source={(user?.profile_picture ? { uri: user.profile_picture } : require('@/assets/images/pfp.png'))}
        style={styles.profileImage}
        contentFit="cover"
      />
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { fontFamily: typography.fonts.light, color: colors.text }]}>{user?.forename} {user?.surname}</Text>
        <Text style={[styles.email, { fontFamily: typography.fonts.light, color: colors.subtext }]}>{user?.user_metadata.email}</Text>
        <TouchableOpacity style={{marginTop: 15}} onPress={() => router.push('/profile/edit')}>
          <FontAwesome6 name="edit" size={24} color={colors.icon} />
        </TouchableOpacity>  
      </View>

      {/* Settings */}
      <View style={[styles.settingsContainer, { backgroundColor: colors.background }]}>
        <Setting
          icon="notifications-outline"
          text="Enable Notifications"
          hasSwitch
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />
        
        <Setting
          icon="card-outline"
          text="Manage Payment Methods"
          hasArrow
          onPress={() => Alert.alert("Coming soon!")}
        />
        
        <Setting
          icon="cash-outline"
          text="Transaction History"
          hasArrow
          onPress={() => Alert.alert("Coming soon!")}
        />
        
        <Setting
          icon="shield-checkmark-outline"
          text="Two-Factor Authentication"
          hasArrow
          onPress={() => Alert.alert("Coming soon!")}
        />
        
        <Setting
          icon="key-outline"
          text="Change Password"
          hasArrow
          onPress={() => Alert.alert("Coming soon!")}
        />
        
        <Setting
          icon="log-out-outline"
          text="Logout"
          hasArrow
          onPress={() => {
            handleLogout();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  settingsContainer: {
    marginTop: 15,
  }
});