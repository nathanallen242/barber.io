# TabLayout Component Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents

- [1. Overview](#1-overview)
- [2. Component Structure](#2-component-structure)
- [3. `screenOptions` Configuration](#3-screenoptions-configuration)
    - [3.1 `tabBarActiveTintColor`](#31-tabbaractivetintcolor)
    - [3.2 `headerShown`](#32-headershown)
    - [3.3 `tabBarButton`](#33-tabbarbutton)
    - [3.4 `tabBarBackground`](#34-tabbarbackground)
    - [3.5 `tabBarStyle`](#35-tabbarstyle)
- [4. Screen Configuration (`Tabs.Screen`)](#4-screen-configuration-tabsscreen)
    - [4.1 `name` Property](#41-name-property)
    - [4.2 `options` Property](#42-options-property)
        - [4.2.1 `title` Property](#421-title-property)
        - [4.2.2 `tabBarIcon` Property](#422-tabbaricon-property)


## 1. Overview

The `TabLayout` component is a React Native component that renders a tab bar interface using `expo-router`'s `Tabs` component.  It provides a customizable and platform-aware tab bar experience.  The component leverages several custom components for enhanced functionality and styling.

## 2. Component Structure

The `TabLayout` component utilizes the following structure:

- **`expo-router`:**  Provides the core tab navigation functionality.
- **`@/components/HapticTab`:** A custom component that likely adds haptic feedback to tab interactions (this is inferred from the component name).
- **`@/components/ui/IconSymbol`:** A custom component for rendering icons within the tab bar.
- **`@/components/ui/TabBarBackground`:** A custom component responsible for styling the background of the tab bar.
- **`@/constants/Colors`:**  Provides a color scheme based on system preferences.
- **`@/hooks/useColorScheme`:** A custom hook that determines the current color scheme (light or dark).


The `TabLayout` function fetches the color scheme using `useColorScheme()` and then passes it to the `Tabs` component.  The core logic lies in configuring the `Tabs` component using the `screenOptions` prop and defining individual screen properties within `Tabs.Screen` components.


## 3. `screenOptions` Configuration

The `screenOptions` prop configures various aspects of the tab bar's appearance and behavior:

| Property             | Description                                                                        | Value                                                       |
|----------------------|------------------------------------------------------------------------------------|------------------------------------------------------------|
| `tabBarActiveTintColor` | The color of the active tab's icon and text.                                     | `Colors[colorScheme ?? 'light'].tint`                      |
| `headerShown`         | Whether to display a header bar above the tabs.                               | `false`                                                     |
| `tabBarButton`        | A custom component to render each tab button.                                   | `HapticTab`                                                |
| `tabBarBackground`    | A custom component to render the tab bar background.                             | `TabBarBackground`                                          |
| `tabBarStyle`         | Style overrides for the tab bar, allowing platform-specific customizations. | Platform-specific styles (transparent background on iOS) |


### 3.1 `tabBarActiveTintColor`

This property dynamically sets the active tab's color based on the system's color scheme (`light` or `dark`).  If `colorScheme` is null, it defaults to `'light'`.

### 3.2 `headerShown`

This property is set to `false` to hide the default header bar provided by `expo-router`, resulting in a cleaner tab bar experience.


### 3.3 `tabBarButton`

This utilizes the custom `HapticTab` component to add haptic feedback (vibration) when a tab is pressed, improving user experience.


### 3.4 `tabBarBackground`

This uses the custom `TabBarBackground` component to customize the appearance of the tab bar's background.


### 3.5 `tabBarStyle`

This uses `Platform.select` to apply platform-specific styles.  On iOS, it sets the `position` to `'absolute'` to enable a blur effect by making the tab bar transparent and showing the content behind it.  On other platforms (Android and web), it uses an empty object, applying no specific styles.



## 4. Screen Configuration (`Tabs.Screen`)

Each tab is defined using a `<Tabs.Screen>` component.


### 4.1 `name` Property

The `name` property specifies the route name for each tab.  In this example, the route names are `"index"` and `"explore"`.


### 4.2 `options` Property

The `options` property provides further customizations for each screen:


#### 4.2.1 `title` Property

This sets the title displayed for each tab.


#### 4.2.2 `tabBarIcon` Property

This property defines the icon to be rendered for each tab.  It utilizes the `IconSymbol` component, passing the color from the `Tabs` component's `color` prop to dynamically style the icons.  The icons are specified by their name (e.g., `"house.fill"`) and size.
