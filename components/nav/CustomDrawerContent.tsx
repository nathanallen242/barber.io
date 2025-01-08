import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet, View, Image, Text } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeStore } from "@/store/themeStore";
import { useUserStore } from "@/store/userStore";
import { useHandleLogOut } from "@/lib/auth";

export default function CustomDrawerContent(props: any) {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();
    const { user } = useUserStore();
    const handleLogout = useHandleLogOut();

    return <DrawerContentScrollView 
    {...props} 
    scrollEnabled={false} 
    contentContainerStyle={[styles.container, { paddingTop: insets.top + 50 }]}>
        <View style={styles.profileContainer}>
            <Image
            source={{ uri: user!.user_metadata.profile_picture }}
            style={styles.profileImage}
            resizeMode="cover"
            />
            <Text style={[styles.profileName, { color: colors.text }]}>{user?.user_metadata.forename}</Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <DrawerItemList 
        {...props}
        />
        <DrawerItem 
        label={'Logout'} 
        onPress={handleLogout} 
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