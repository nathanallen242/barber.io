# RootLayout Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Imports](#2-imports)
* [3. Splash Screen Management](#3-splash-screen-management)
* [4. Font Loading](#4-font-loading)
* [5. Theme Provider](#5-theme-provider)
* [6.  Component Structure](#6-component-structure)
* [7. Error Handling](#7-error-handling)


## 1. Overview

The `RootLayout` component serves as the root component for the application's navigation.  It handles loading assets (fonts and splash screen management), applying a theme based on the user's color scheme preference, and setting up the main navigation stack.


## 2. Imports

The component utilizes several external libraries:

| Library                    | Purpose                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| `@react-navigation/native` | Provides the `ThemeProvider`, `DarkTheme`, and `DefaultTheme` for theme management and navigation. |
| `expo-font`                 | Used for asynchronous font loading.                                        |
| `expo-router`               | Enables declarative routing using Expo Router's `Stack` component.          |
| `expo-splash-screen`        | Manages the splash screen during application startup.                       |
| `expo-status-bar`           | Controls the status bar appearance.                                       |
| `react`                     | Core React library.                                                        |
| `react-native-reanimated`   | Provides reanimated animation library (although not explicitly used in this function) |
| `@/hooks/useColorScheme`    | A custom hook (presumably) to determine the user's preferred color scheme. |


## 3. Splash Screen Management

The application uses `expo-splash-screen` to prevent the splash screen from disappearing prematurely before assets have finished loading.

*   `SplashScreen.preventAutoHideAsync();` prevents the automatic hiding of the splash screen.
*   The `useEffect` hook, triggered by the `loaded` state (indicating font loading completion), calls `SplashScreen.hideAsync();` to remove the splash screen once fonts are loaded.


## 4. Font Loading

The `useFonts` hook from `expo-font` loads the `SpaceMono` font asynchronously.

*   `const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'), });` loads the font from the specified path.  The `loaded` state variable tracks the loading status – `true` if loading is complete, `false` otherwise.


## 5. Theme Provider

The `ThemeProvider` from `@react-navigation/native` dynamically applies either the `DarkTheme` or `DefaultTheme` based on the value of `colorScheme`, which is determined by the `useColorScheme` hook. This enables dark mode support.


## 6. Component Structure

The main component structure uses a `Stack` navigator from `expo-router`:

*   `<Stack>`: Defines the main navigation stack.
*   `<Stack.Screen name="(tabs)" options={{ headerShown: false }} />`: Represents the "tabs" screen, which is likely a tab navigator.  The `headerShown: false` option hides the header for this screen.
*   `<Stack.Screen name="+not-found" />`: A catch-all screen for routes that are not defined.

The entire navigation structure is wrapped within the `ThemeProvider` to apply the appropriate theme globally.


## 7. Error Handling

The component includes a simple error handling mechanism:

* `if (!loaded) { return null; }`: While fonts are loading (`loaded` is `false`), the component renders nothing (`null`), preventing rendering errors and providing a smooth user experience.  Once fonts load, the component renders the navigation structure.
