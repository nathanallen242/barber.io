# HelloWave Component Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents <a name="table-of-contents"></a>

* [1. Overview](#overview)
* [2. Component Structure](#component-structure)
* [3. Animation Logic](#animation-logic)
* [4. Styling](#styling)


## 1. Overview <a name="overview"></a>

The `HelloWave` component renders a waving hand emoji that utilizes `react-native-reanimated` for smooth and performant animations.  The animation involves a cyclical rotation of the emoji.


## 2. Component Structure <a name="component-structure"></a>

The component uses the following React Native and `react-native-reanimated` libraries:

* **`useEffect` Hook:**  Manages the lifecycle of the animation. The animation starts when the component mounts.
* **`StyleSheet`:** Defines the styling for the text within the component.
* **`useSharedValue`:** Creates a shared value (`rotationAnimation`) to store the current rotation angle. This is crucial for `react-native-reanimated`'s animation system.
* **`useAnimatedStyle`:**  Connects the `rotationAnimation` value to the component's style, driving the animation.
* **`withTiming`, `withRepeat`, `withSequence`:** These are Reanimated animation functions that build the animation sequence.
* **`Animated.View`:**  A Reanimated component that allows for animated styles to be applied.
* **`ThemedText`:** A custom component (presumably from `@/components/ThemedText`) for rendering text with theming capabilities.


## 3. Animation Logic <a name="animation-logic"></a>

The core animation logic is defined within the `useEffect` hook:

| Function Call        | Description                                                                   | Parameters                                      | Result                                                                      |
|----------------------|-------------------------------------------------------------------------------|-------------------------------------------------|------------------------------------------------------------------------------|
| `withTiming(25, { duration: 150 })` | Animates the rotation to 25 degrees over 150 milliseconds.                | `25` (target rotation), `{ duration: 150 }` (animation duration) | Returns an animation sequence that rotates to 25 degrees.                      |
| `withTiming(0, { duration: 150 })`  | Animates the rotation back to 0 degrees over 150 milliseconds.             | `0` (target rotation), `{ duration: 150 }` (animation duration)  | Returns an animation sequence that rotates back to 0 degrees.                   |
| `withSequence(...)`   | Sequentially executes the two `withTiming` animations.                     | Two animation sequences (from `withTiming`).       | Creates a sequence that goes from 0 to 25 degrees then back to 0.           |
| `withRepeat(..., 4)` | Repeats the animation sequence four times.                                     | The animation sequence, `4` (number of repetitions) | Creates a repeating animation sequence that runs 4 times.                      |


The `rotationAnimation.value` is updated with the result of this chain of animation functions. This value is then used within `useAnimatedStyle` to dynamically update the `transform: rotate` style property of the `Animated.View`, resulting in the waving animation.  The animation smoothly rotates the emoji 25 degrees, then back to its original position, repeating this cycle four times.


## 4. Styling <a name="styling"></a>

The styles for the emoji are defined using `StyleSheet.create`:

| Style Property | Value     | Description                                 |
|-----------------|-----------|---------------------------------------------|
| `fontSize`      | `28`      | Font size of the emoji.                     |
| `lineHeight`    | `32`      | Line height of the emoji.                   |
| `marginTop`     | `-6`      | Adjusts the vertical position of the emoji. |

The emoji itself (`\xf0\x9f\x91\x8b`) is rendered as a `ThemedText` component, likely allowing for customization based on a theme.
