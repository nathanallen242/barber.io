# NotFoundScreen.js - Internal Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents

* [1. Overview](#1-overview)
* [2. Imports](#2-imports)
* [3. `NotFoundScreen` Function Component](#3-notfoundscreen-function-component)
* [4. Styling (`styles` Object)](#4-styling-styles-object)


<a name="1-overview"></a>
## 1. Overview

This document details the implementation of the `NotFoundScreen` component in the application.  This component is displayed when the user navigates to a route that does not exist within the application.  It provides a user-friendly message and a link to return to the home screen.


<a name="2-imports"></a>
## 2. Imports

The component utilizes the following imports:

| Import Statement             | Module                    | Description                                                                |
|------------------------------|----------------------------|----------------------------------------------------------------------------|
| `{ Link, Stack }`           | `expo-router`             | Provides components for navigation and screen management within the Expo Router. |
| `{ StyleSheet }`            | `react-native`            | Provides tools for styling React Native components.                         |
| `{ ThemedText }`            | `@/components/ThemedText` | A custom component for displaying text with theme-aware styling.           |
| `{ ThemedView }`            | `@/components/ThemedView` | A custom component for displaying views with theme-aware styling.           |


<a name="3-notfoundscreen-function-component"></a>
## 3. `NotFoundScreen` Function Component

The `NotFoundScreen` component is a functional component that renders a simple screen informing the user that the requested screen was not found.  It leverages Expo Router's `Stack.Screen` component to integrate with the navigation stack, setting the screen title to "Oops!".  The core UI is constructed using `ThemedView` and `ThemedText` components for consistent styling across different themes. A `Link` component facilitates navigation back to the home screen ("/") using the `href` prop.

```javascript
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
```

<a name="4-styling-styles-object"></a>
## 4. Styling (`styles` Object)

The `styles` object utilizes `StyleSheet.create` from `react-native` to define styles for the component.  It uses flexbox for layout and provides padding and margins for visual spacing.

| Style Name  | Properties              | Description                                         |
|-------------|--------------------------|-----------------------------------------------------|
| `container` | `flex: 1`, `alignItems: 'center'`, `justifyContent: 'center'`, `padding: 20` | Centers content both horizontally and vertically, adding 20px padding. |
| `link`      | `marginTop: 15`, `paddingVertical: 15` | Adds top margin and vertical padding to the link.   |

The styling ensures that the message and link are clearly visible and centrally positioned on the screen.
