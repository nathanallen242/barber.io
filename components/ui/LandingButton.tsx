import { RefObject } from 'react';
import { StyleSheet, TouchableWithoutFeedback, ImageSourcePropType, FlatList } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import { useThemeStore } from '@/store/themeStore';
import { useRouter } from 'expo-router';

interface LandingButtonProps {
  flatListRef: RefObject<FlatList<any>>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
  arrowIconSource?: ImageSourcePropType;
}

const LandingButton: React.FC<LandingButtonProps> = ({
  flatListRef,
  flatListIndex,
  dataLength,
  arrowIconSource = require('@/assets/icons/ArrowIcon.png'),
}) => {
  const router = useRouter();
  const { colors, typography } = useThemeStore();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  const handlePress = () => {
    if (flatListIndex.value < dataLength - 1) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      router.push('/(auth)/landing')
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.container, buttonAnimationStyle, { backgroundColor: colors.button }]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle, { fontFamily: typography.fonts.regular }]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={arrowIconSource}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default LandingButton;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
    position: 'absolute',
  },
});
