# HapticTab Component Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents

<a name="table-of-contents"></a>

* [1. Overview](#overview)
* [2. Function Details: `HapticTab`](#function-details-haptictab)
    * [2.1 Parameters](#parameters)
    * [2.2 Return Value](#return-value)
    * [2.3 Algorithm](#algorithm)


## 1. Overview

The `HapticTab` component enhances the default `BottomTabBarButton` provided by `@react-navigation/bottom-tabs` by adding haptic feedback on press-in for iOS devices.  This improves the user experience by providing subtle tactile confirmation of user interaction.


## 2. Function Details: `HapticTab`

<a name="function-details-haptictab"></a>

The `HapticTab` function is a higher-order component that wraps a `PlatformPressable` component from `@react-navigation/elements`. It conditionally triggers haptic feedback based on the operating system.

### 2.1 Parameters

| Parameter       | Type                                      | Description                                                                  |
|-----------------|-------------------------------------------|------------------------------------------------------------------------------|
| `props`         | `BottomTabBarButtonProps`                 |  All properties passed to the underlying `PlatformPressable` component.      |


### 2.2 Return Value

The function returns a `PlatformPressable` component with added `onPressIn` functionality.

### 2.3 Algorithm

The core logic within the `HapticTab` function is implemented in the `onPressIn` handler.  The algorithm works as follows:

1. **Platform Check:** It first checks the value of `process.env.EXPO_OS`. If the environment variable is set to `'ios'`, it proceeds with haptic feedback.  This conditional check ensures that the haptic feedback is only triggered on iOS devices, avoiding unnecessary calls on other platforms where haptic feedback might not be supported or desired.

2. **Haptic Feedback (iOS Only):** If the platform is iOS, the `Haptics.impactAsync` function from the `expo-haptics` library is called with `Haptics.ImpactFeedbackStyle.Light`. This generates a light haptic impact, providing subtle feedback to the user.

3. **Original `onPressIn` Handler:** Regardless of the platform, the original `onPressIn` handler from the input `props` is then executed, ensuring that any existing functionality of the original button remains intact.  The `props.onPressIn?.(ev)` uses optional chaining (`?.`) to safely handle cases where `props.onPressIn` might be undefined.


This approach ensures that the haptic feedback is added non-intrusively, preserving the existing functionality and enhancing the user experience on supported platforms.
