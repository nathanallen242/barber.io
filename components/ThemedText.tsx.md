# ThemedText Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Type Definitions](#2-type-definitions)
    * [2.1. `ThemedTextProps`](#21-themedtextprops)
* [3. `ThemedText` Function](#3-themedtext-function)
    * [3.1. Parameters](#31-parameters)
    * [3.2. Algorithm](#32-algorithm)
    * [3.3. Return Value](#33-return-value)
* [4. Styling (`styles` Constant)](#4-styling-styles-constant)


## 1. Overview

The `ThemedText` component is a React Native component that renders text with dynamic styling based on the application's theme and provided props.  It leverages the `useThemeColor` hook (assumed to be defined elsewhere) to determine the appropriate text color based on light and dark mode settings.  The component also supports different text styles, such as titles, subtitles, and links, allowing for consistent and theme-aware text rendering throughout the application.

## 2. Type Definitions

### 2.1. `ThemedTextProps`

This type defines the props accepted by the `ThemedText` component. It extends the standard `TextProps` from `react-native`.

| Prop Name       | Type                               | Description                                                                    |
|-----------------|------------------------------------|--------------------------------------------------------------------------------|
| `style`         | `StyleProp<ViewStyle>`              |  React Native style object for overriding default styles.                     |
| `lightColor`    | `string`                           | Text color to use in light theme. Overrides default theme color if provided. |
| `darkColor`     | `string`                           | Text color to use in dark theme. Overrides default theme color if provided.  |
| `type`          | `'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'` | Specifies the text style variant.                                            |


## 3. `ThemedText` Function

This function is the core of the themed text component.

### 3.1. Parameters

The `ThemedText` function accepts the following parameters:

| Parameter Name | Type                | Description                                                                   | Default Value |
|-----------------|---------------------|-------------------------------------------------------------------------------|----------------|
| `style`         | `StyleProp<ViewStyle>` | React Native style object for overriding default styles.                     | `undefined`    |
| `lightColor`    | `string`            | Text color for light theme.                                                   | `undefined`    |
| `darkColor`     | `string`            | Text color for dark theme.                                                   | `undefined`    |
| `type`          | `string`            | Text style variant ('default', 'title', 'defaultSemiBold', 'subtitle', 'link') | `'default'`    |
| `...rest`       | `TextProps`         | Any other valid `Text` props from `react-native`.                           | `undefined`    |


### 3.2. Algorithm

1. **Theme Color Determination:** The `useThemeColor` hook is called with the provided `lightColor` and `darkColor` props.  This hook presumably handles retrieving the appropriate color based on the current theme (light or dark mode). The result is stored in the `color` variable.

2. **Style Array Construction:** An array of style objects is constructed.  This array dynamically includes styles based on the `type` prop.  If `type` is 'default', `styles.default` is added; if `type` is 'title', `styles.title` is added, and so on.  The user-provided `style` prop is also included at the end to allow for overriding or adding additional styles.

3. **Text Rendering:** A `<Text>` component is rendered using the constructed style array and the remaining props (`...rest`).


### 3.3. Return Value

The function returns a React Native `<Text>` component with dynamically applied styles based on the theme and the provided `type` prop.


## 4. Styling (`styles` Constant)

This constant uses `StyleSheet.create` to define a set of styles for different text types. Each style object defines properties such as `fontSize`, `lineHeight`, `fontWeight`, and `color`.

| Style Name          | Properties                               | Description                                         |
|----------------------|-------------------------------------------|-----------------------------------------------------|
| `default`           | `fontSize: 16, lineHeight: 24`           | Default text style.                               |
| `defaultSemiBold`   | `fontSize: 16, lineHeight: 24, fontWeight: '600'` | Default semi-bold text style.                      |
| `title`             | `fontSize: 32, fontWeight: 'bold', lineHeight: 32` | Title text style.                                  |
| `subtitle`          | `fontSize: 20, fontWeight: 'bold'`        | Subtitle text style.                               |
| `link`              | `lineHeight: 30, fontSize: 16, color: '#0a7ea4'` | Link text style (with a specific blue color).       |

These styles ensure consistent and visually appealing text rendering across different parts of the application.
