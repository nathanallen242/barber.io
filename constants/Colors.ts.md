# Internal Documentation: Color Palette

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [Introduction](#introduction)
* [Color Definitions](#color-definitions)
* [Usage Example](#usage-example)


## Introduction

This document details the color palette used within the application.  The palette is designed to support both light and dark modes, providing appropriate color contrast for various UI elements.  Alternative styling approaches, such as Nativewind, Tamagui, and Unistyles, are noted but not implemented in this particular instance.


## Color Definitions

The application utilizes a consistent color scheme across light and dark modes.  The colors are defined as constants for easy access and maintainability.  The structure is designed for simple integration with theme providers or other styling mechanisms.

| Color Name         | Light Mode Hex Code | Dark Mode Hex Code | Description                               |
|----------------------|----------------------|----------------------|-------------------------------------------|
| `text`              | `#11181C`            | `#ECEDEE`            | Primary text color.                       |
| `background`        | `#fff`               | `#151718`            | Primary background color.                  |
| `tint`              | `#0a7ea4`            | `#fff`               | Accent color, used for highlighting.      |
| `icon`              | `#687076`            | `#9BA1A6`            | Default icon color.                      |
| `tabIconDefault`    | `#687076`            | `#9BA1A6`            | Default tab icon color.                  |
| `tabIconSelected`   | `#0a7ea4`            | `#fff`               | Selected tab icon color.                  |


The `Colors` object provides a structured way to access these colors:

```javascript
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
```

This allows for easy switching between light and dark mode by accessing either `Colors.light` or `Colors.dark`.


## Usage Example

Accessing a color is straightforward:

```javascript
import { Colors } from './colors'; // Assuming the file is named 'colors.js'

const backgroundColor = Colors.dark.background; // Accesses the dark mode background color

// ... use backgroundColor in your component ...
```

This approach ensures consistent and easily manageable color usage throughout the application.  The use of constants (`tintColorLight`, `tintColorDark`) ensures that color changes only need to be updated in a single location.
