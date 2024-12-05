# Collapsible Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Component Usage](#2-component-usage)
* [3. Props](#3-props)
* [4. Implementation Details](#4-implementation-details)
    * [4.1 State Management](#4.1-state-management)
    * [4.2 Theme Handling](#4.2-theme-handling)
    * [4.3 Icon Rotation](#4.3-icon-rotation)
* [5. Styling](#5-styling)


## 1. Overview

The `Collapsible` component provides a collapsible section with a title and custom content.  It uses a simple toggle mechanism to show or hide its children. The component adapts to the current color scheme (light or dark).

## 2. Component Usage

The `Collapsible` component is used by wrapping the content that should be collapsible within it and providing a title.

```jsx
<Collapsible title="My Collapsible Section">
  {/* Content to be collapsed */}
  <Text>This is some content that will collapse.</Text>
</Collapsible>
```

## 3. Props

| Prop Name     | Type                               | Description                                                                     | Required | Default |
|---------------|------------------------------------|---------------------------------------------------------------------------------|----------|---------|
| `children`    | ReactNode                           | The content to be displayed within the collapsible section.                     | Yes      |         |
| `title`       | string                             | The title displayed on the header of the collapsible section.                   | Yes      |         |


## 4. Implementation Details

### 4.1 State Management

The component uses the `useState` hook from React to manage the collapsed/expanded state.  `isOpen` is a boolean variable that tracks whether the content is currently visible. The `setIsOpen` function is used to toggle this state. The toggle is implemented using a functional update to ensure the state change is properly reflected.  `setIsOpen((value) => !value)` inverts the current value of `isOpen` on each press.

### 4.2 Theme Handling

The component utilizes the `useColorScheme` hook to determine the current theme (light or dark).  This theme is then used to conditionally set the color of the chevron icon.  If the theme is 'light', `Colors.light.icon` is used; otherwise, `Colors.dark.icon` is used.  This ensures that the icon's color contrasts appropriately with the background in both light and dark modes.

### 4.3 Icon Rotation

The chevron icon rotates 90 degrees when the collapsible section is opened. This visual cue informs the user of the open/closed state. The rotation is implemented using the `transform` style property and conditional rendering based on the value of the `isOpen` state variable.

## 5. Styling

The component's styling is managed using the `StyleSheet` API from React Native.

| Style Name | Property         | Value             | Description                                          |
|------------|-----------------|--------------------|------------------------------------------------------|
| `heading`  | `flexDirection` | `'row'`           | Arranges the icon and title horizontally.             |
|            | `alignItems`     | `'center'`        | Vertically centers the icon and title.                |
|            | `gap`            | `6`               | Adds spacing between the icon and title.             |
| `content`  | `marginTop`      | `6`               | Adds top margin to the content.                       |
|            | `marginLeft`     | `24`              | Adds left margin to the content (indentation).       |

The styles are defined using `StyleSheet.create`. This approach provides performance benefits by creating styles once and reusing them.
