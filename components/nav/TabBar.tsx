import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { useThemeStore } from '@/store/themeStore';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {
  const { colors } = useThemeStore();
  const { buildHref } = useLinkBuilder();
  const icons = {
    scheduled: (props: any) => (
      <FontAwesome name="calendar-plus-o" size={24} color={colors.icon} {...props} />
    ),
    completed: (props: any) => (
      <FontAwesome name="calendar-check-o" size={24} color={colors.icon} {...props} />
    ),
    cancelled: (props: any) => (
      <FontAwesome name="calendar-times-o" size={24} color={colors.icon} {...props} />
    ),
  };

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.border }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {icons[route.name as keyof typeof icons]({
                color: isFocused ? colors.primary : colors.text
            })}
            {typeof label === 'string' ? (
              <Text style={{ color: isFocused ? colors.subtext : colors.text }}>
                {label}
              </Text>
            ) : (
              label({ 
                focused: isFocused, 
                color: isFocused ? colors.primary : colors.text, 
                position: 'below-icon',
                children: route.name
              })
            )}
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 50,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
    }
})