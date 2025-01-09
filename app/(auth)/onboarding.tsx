import { useCallback } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, ViewToken, ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { useThemeStore } from '@/store/themeStore';

import data from '@/data/onboarding';
import Pagination from '@/components/ui/Pagination';
import LandingButton from '@/components/ui/LandingButton';

interface DataItem {
  id: number;
  title: string;
  text: string;
  image: ImageSourcePropType;
}

const OnboardingScreen: React.FC = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList<DataItem>>();
  const x: SharedValue<number> = useSharedValue(0);
  const flatListIndex: SharedValue<number> = useSharedValue(0);
  const { colors, typography } = useThemeStore();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        flatListIndex.value = viewableItems[0].index;
      }
    },
    [flatListIndex]
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const RenderItem: React.FC<{ item: DataItem; index: number }> = ({ item, index }) => {
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
      const translateYAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );
      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        transform: [{ translateY: translateYAnimation }],
      };
    });

    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [0, 1, 0],
        Extrapolation.CLAMP,
      );
      const translateYAnimation = interpolate(
        x.value,
        [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH],
        [100, 0, 100],
        Extrapolation.CLAMP,
      );
      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
      };
    });

    return (
      <View style={[styles.itemContainer, { width: SCREEN_WIDTH, backgroundColor: colors.primary }]}>
        <Animated.Image source={item.image} style={imageAnimationStyle} />
        <Animated.View style={textAnimationStyle}>
          <Text style={[styles.itemTitle, { 
            fontFamily: typography.fonts.bold,
            fontSize: typography.sizes.xxl }]}>{item.title}</Text>
          <Text style={[styles.itemText, { 
            fontFamily: typography.fonts.light,
            fontSize: typography.sizes.lg }]}>{item.text}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.FlatList<DataItem>
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <LandingButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8E9B0',
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  itemText: {
    textAlign: 'center',
    marginHorizontal: 35,
    color: 'black',
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
