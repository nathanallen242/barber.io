# Internal Documentation: `useThemeColor` Hook

[Linked Table of Contents](#linked-table-of-contents)

## Overview

The `useThemeColor` hook provides a convenient way to access colors based on the current color scheme (light or dark mode). It prioritizes colors passed as props, falling back to predefined colors from the `Colors` constant.  This promotes code reusability and maintainability by centralizing color management.


## Linked Table of Contents

* [Function Signature](#function-signature)
* [Algorithm Description](#algorithm-description)
* [Usage Example](#usage-example)


## Function Signature

```typescript
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string;
```

* **`props: { light?: string; dark?: string }`**: An object containing optional `light` and `dark` properties. These properties allow overriding the default light and dark mode colors on a per-component basis.  If a color is specified in `props` for the current theme, it will be used. Otherwise, the default color from `Colors` will be used.

* **`colorName: keyof typeof Colors.light & keyof typeof Colors.dark`**: This type ensures that `colorName` is a valid key in *both* the `Colors.light` and `Colors.dark` objects. This guarantees that the selected color exists regardless of the active theme.


* **`Return Value: string`**: The function returns a string representing the color in hexadecimal format (#RRGGBB)  or other valid color string format as defined within `Colors`.


## Algorithm Description

The `useThemeColor` hook implements a simple conditional logic to determine the appropriate color:

1. **Determine the current theme:** It first retrieves the current color scheme using `useColorScheme()`. If no scheme is explicitly set, it defaults to 'light'.

2. **Check for props override:** It checks if a color is provided in the `props` object for the current theme (either `props.light` or `props.dark`).

3. **Return color:**
   - If a color is found in `props`, that color is returned.
   - Otherwise, it retrieves the color from the `Colors` constant based on the current theme and the provided `colorName`.  For example, if the theme is 'dark' and `colorName` is 'background', it will return `Colors.dark.background`.

This prioritization ensures that component-specific color overrides take precedence over the default theme colors.



## Usage Example

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { useThemeColor } from './useThemeColor';

const MyComponent = () => {
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={{ backgroundColor }}>
      <Text style={{ color: textColor }}>Hello, world!</Text>
    </View>
  );
};
```

In this example:

* `backgroundColor` will use '#fff' in light mode and '#000' in dark mode because it's explicitly defined in props.
* `textColor` will use the default `Colors.light.text` in light mode and `Colors.dark.text` in dark mode, as no prop overrides are given.

This approach ensures that the component adapts to the user's preferred color scheme while allowing for flexible customization.
