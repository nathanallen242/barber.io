# ParallaxScrollView Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Props](#2-props)
* [3. Implementation Details](#3-implementation-details)
    * [3.1 `useAnimatedStyle` Hook](#31-useanimatedstyle-hook)
    * [3.2 Interpolation Algorithm](#32-interpolation-algorithm)
* [4. Styling](#4-styling)


## 1. Overview

The `ParallaxScrollView` component implements a parallax scrolling effect for a header image above scrollable content.  The header image scales and translates as the user scrolls, creating a visually engaging user experience. The component leverages `react-native-reanimated` for smooth animations and performance.  It adapts to the user's color scheme and accounts for bottom tab bar overflow.


## 2. Props

| Prop Name             | Type                                  | Description                                                                     | Required | Default |
|------------------------|---------------------------------------|---------------------------------------------------------------------------------|----------|---------|
| `children`             | `ReactElement`                         | The content to be displayed below the header.                                     | Yes      |         |
| `headerImage`          | `ReactElement`                         | The image to be displayed as the parallax header.                               | Yes      |         |
| `headerBackgroundColor` | `{ dark: string; light: string; }` | An object containing background colors for dark and light color schemes.       | Yes      |         |


## 3. Implementation Details

The component utilizes several `react-native-reanimated` hooks to achieve the parallax effect.

### 3.1 `useAnimatedStyle` Hook

The `useAnimatedStyle` hook dynamically calculates the styles for the header based on the scroll offset.  The returned style object modifies the `transform` property of the header `Animated.View`. The transform includes:

* **Translation:** The `translateY` value is interpolated based on the scroll offset.  This creates the vertical parallax effect.
* **Scaling:** The `scale` value is interpolated, resulting in a scaling effect of the header image as the user scrolls.

### 3.2 Interpolation Algorithm

The core of the parallax effect lies in the interpolation of the scroll offset.  The `interpolate` function maps the input range (scroll offset) to an output range (transform values).

The `translateY` interpolation uses the following ranges:

* **Input Range:** `[-HEADER_HEIGHT, 0, HEADER_HEIGHT]`  This represents the scroll offset: from the top of the header to the bottom. `HEADER_HEIGHT` is a constant defined as 250.
* **Output Range:** `[-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]` This defines how the header translates vertically at different scroll positions.

The `scale` interpolation uses the following ranges:

* **Input Range:** `[-HEADER_HEIGHT, 0, HEADER_HEIGHT]` (Same as translateY)
* **Output Range:** `[2, 1, 1]` This defines the scaling of the header. At the top, the header is twice its normal size, and it returns to normal size as the user scrolls down.

These ranges are carefully chosen to produce a visually appealing and smooth parallax effect.


## 4. Styling

The component uses the `StyleSheet` API for styling.  Key styles include:

* **`container`:**  A flex container that takes up the full screen.
* **`header`:** Styles the header view, setting its height to `HEADER_HEIGHT` and managing overflow to prevent content from appearing outside the header boundaries.
* **`content`:** Styles the scrollable content area, including padding, gap and overflow management.

The header's background color is dynamically determined based on the user's color scheme using `headerBackgroundColor[colorScheme]`.
