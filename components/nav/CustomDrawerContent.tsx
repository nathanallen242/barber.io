import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet, View, Image, Text } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useThemeStore } from "@/store/themeStore";
import { useUserStore } from "@/store/userStore";

export default function CustomDrawerContent(props: any) {
    const router = useRouter();
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();
    const { user, clearUser } = useUserStore();
    const defaultPhoto = require('@/assets/images/pfp.png');
    const defaultName = 'Nathan';

    const handleLogOut = async () => {
        try {
          await supabase.auth.signOut();
          clearUser();
          console.log("User logged out successfully!")
          router.replace('/')
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

    return <DrawerContentScrollView 
    {...props} 
    scrollEnabled={false} 
    contentContainerStyle={[styles.container, { paddingTop: insets.top + 50 }]}>
        <View style={styles.profileContainer}>
            <Image
            source={ user?.profile_picture ? { uri: user.profile_picture } : defaultPhoto }
            style={styles.profileImage}
            resizeMode="cover"
            />
            <Text style={[styles.profileName, { color: colors.text }]}>{user?.forename || defaultName}</Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <DrawerItemList 
        {...props}
        />
        <DrawerItem 
        label={'Logout'} 
        onPress={handleLogOut} 
        labelStyle={[styles.label, { color: colors.text }]}
        icon={({ size }) => (
            <Ionicons name="log-out-outline" size={size} color={colors.icon} />
        )}
        />
    </DrawerContentScrollView>
}

const styles = StyleSheet.create({
    label: {
        marginLeft: 25,
        fontSize: 20,
        fontFamily: 'Poppins_300Light',
    },
    container: {
        flex: 1,
    },
    profileContainer: {
        alignItems: 'center',
        paddingBottom: 15,
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    profileName: {
        fontSize: 25,
        fontWeight: '200'
    },
    divider: {
        height: 1,
        marginHorizontal: 20,
        marginBottom: 15,
    },
});