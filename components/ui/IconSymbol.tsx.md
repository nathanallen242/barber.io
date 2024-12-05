# IconSymbol Component Documentation

[Linked Table of Contents](#table-of-contents)

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component: `IconSymbol`](#2-component-iconsymbol)
    * [2.1. Props](#21-props)
    * [2.2. Implementation Details](#22-implementation-details)
* [3. Type: `IconSymbolName`](#3-type-iconsymbolname)
* [4. Constant: `MAPPING`](#4-constant-mapping)


## 1. Overview

This document details the `IconSymbol` component and related types and constants.  This component provides a cross-platform solution for displaying icons, leveraging native SFSymbols on iOS and MaterialIcons on Android and web. This approach ensures consistent visual appearance across different platforms while optimizing resource usage.  The mapping between SFSymbol names and MaterialIcons names is crucial for this functionality.


## 2. Component: `IconSymbol`

The `IconSymbol` component renders an icon using either SFSymbols (implicitly on iOS) or MaterialIcons (explicitly on Android and web).  It achieves cross-platform consistency by mapping SFSymbol names to their MaterialIcons equivalents.


### 2.1. Props

| Prop Name  | Type                     | Description                                                                 | Required | Default |
|-------------|--------------------------|-----------------------------------------------------------------------------|----------|---------|
| `name`      | `IconSymbolName`         | The name of the SFSymbol to display.  Must be a key in the `MAPPING` constant. | Yes      |         |
| `size`      | `number`                 | The size of the icon in pixels.                                             | No       | `24`    |
| `color`     | `string \| OpaqueColorValue` | The color of the icon.                                                     | Yes      |         |
| `style`     | `StyleProp<ViewStyle>`   | Custom styling for the icon.                                                | No       |         |
| `weight`    | `SymbolWeight`           | *(Not used in current implementation)*  Potentially for future SFSymbol weight variations. | No       |         |


### 2.2. Implementation Details

The core logic of the `IconSymbol` component lies in its use of the `MAPPING` constant.  This constant provides a direct mapping between SFSymbol names (keys) and their corresponding MaterialIcons names (values).  The component simply uses the provided `name` prop to lookup the appropriate MaterialIcons name from `MAPPING` and renders a `MaterialIcons` component with that name and the other specified properties.

The algorithm is straightforward:

1. The component receives the `name` prop, representing the desired SFSymbol.
2. It accesses the `MAPPING` object using `MAPPING[name]` to retrieve the equivalent MaterialIcons name.
3. A `MaterialIcons` component is rendered, using the retrieved MaterialIcons name, along with the provided `size`, `color`, and `style` props.


## 3. Type: `IconSymbolName`

This type defines the set of valid `name` props that can be passed to the `IconSymbol` component.  It is a keyof type, derived from the keys of the `MAPPING` object.  This ensures type safety, preventing the use of invalid SFSymbol names.


## 4. Constant: `MAPPING`

This constant is the heart of the cross-platform icon rendering.  It's a mapping from SFSymbol names to their MaterialIcons counterparts.  Any new icon support requires adding an entry to this mapping, ensuring both a SFSymbol and MaterialIcon exist for the desired visual.  The keys represent SFSymbol names and values represent the equivalent MaterialIcons names.  It is of type `Partial<Record<SymbolViewProps['name'], React.ComponentProps<typeof MaterialIcons>['name']>>` to accommodate partial mappings and ensure type safety.

Example entries:

| SFSymbol Name                     | MaterialIcons Name |
|------------------------------------|--------------------|
| `house.fill`                      | `home`             |
| `paperplane.fill`                 | `send`             |
| `chevron.left.forwardslash.chevron.right` | `code`             |
| `chevron.right`                   | `chevron-right`    |

This mapping ensures that the correct icon is rendered regardless of the platform.  Referencing the URLs embedded in the code comments is necessary to ensure correct mapping between SFSymbols and MaterialIcons.
