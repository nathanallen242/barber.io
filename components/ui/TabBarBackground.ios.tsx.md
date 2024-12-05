# BlurTabBarBackground and useBottomTabOverflow Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents

* [1. Module Overview](#1-module-overview)
* [2. `BlurTabBarBackground` Component](#2-blurtabbarbackground-component)
  * [2.1 Functionality](#21-functionality)
  * [2.2 Styling](#22-styling)
* [3. `useBottomTabOverflow` Hook](#3-usebottomtaboverflow-hook)
  * [3.1 Functionality and Algorithm](#31-functionality-and-algorithm)
  * [3.2 Return Value](#32-return-value)


## 1. Module Overview

This module provides two React Native components: `BlurTabBarBackground` and the custom hook `useBottomTabOverflow`.  `BlurTabBarBackground` renders a blurred background behind a bottom tab bar, ensuring consistent appearance across different iOS versions and system themes. `useBottomTabOverflow` calculates the amount of overflow from the bottom tab bar beyond the device's safe area insets.


## 2. `BlurTabBarBackground` Component

### 2.1 Functionality

The `BlurTabBarBackground` component renders a blurred view using `expo-blur`'s `BlurView` component. This is positioned absolutely to fill the entire screen (`StyleSheet.absoluteFill`).  The blur effect dynamically adapts to the system's theme using `tint="systemChromeMaterial"` ensuring a visually cohesive experience.  The intensity of the blur is fixed at 100.


### 2.2 Styling

The component utilizes `StyleSheet.absoluteFill` to ensure that the blurred background covers the entire screen area, positioning itself behind other content. The `tint` property leverages system chrome material for theme consistency.  The `intensity` is set to a fixed value of 100.


## 3. `useBottomTabOverflow` Hook

### 3.1 Functionality and Algorithm

The `useBottomTabOverflow` hook calculates the visible overflow of the bottom tab bar beyond the device's safe area insets.  It achieves this by subtracting the safe area inset from the bottom (`useSafeAreaInsets().bottom`) from the total height of the bottom tab bar (`useBottomTabBarHeight()`).  This effectively determines how much of the tab bar extends beyond the screen's usable area.

The algorithm is simple subtraction:

```
overflow = tabBarHeight - bottomSafeAreaInset
```

Where:

* `tabBarHeight`: Height of the bottom tab bar obtained from `useBottomTabBarHeight()`.
* `bottomSafeAreaInset`:  Bottom safe area inset obtained from `useSafeAreaInsets().bottom`.


### 3.2 Return Value

The hook returns a single numerical value representing the amount of overflow (in pixels) of the bottom tab bar beyond the device's safe area. A positive value indicates overflow, while a non-positive value indicates no overflow or that the tab bar is fully within the safe area.  The return value is a number.
