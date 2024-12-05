# IconSymbol Component Documentation

[Linked Table of Contents](#linked-table-of-contents)

## 1. Overview

The `IconSymbol` component renders an icon from the `expo-symbols` library. It provides a convenient wrapper to customize the icon's appearance, including size, color, weight, and style.  This component leverages React Native's `SymbolView` component for rendering.

## 2.  Component Signature

```typescript
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  // ... implementation ...
}
```

| Parameter | Type                     | Description                                          | Default Value | Required |
|------------|--------------------------|------------------------------------------------------|----------------|----------|
| `name`     | `SymbolViewProps['name']` | The name of the symbol to render (from `expo-symbols`). |  N/A          | Yes      |
| `size`     | `number`                 | The size of the icon in pixels.                       | 24            | No       |
| `color`    | `string`                 | The color of the icon.                               | N/A          | Yes      |
| `style`    | `StyleProp<ViewStyle>`   | Additional style overrides for the icon.             | N/A          | No       |
| `weight`   | `SymbolWeight`           | The weight (e.g., 'regular', 'bold') of the icon.    | 'regular'     | No       |


## 3. Implementation Details

The `IconSymbol` function takes the icon parameters and renders a `SymbolView` component.  The key logic lies in how it handles styling:

1. **Size Handling:** The `size` prop determines both the width and height of the `SymbolView`, ensuring a square icon. This is achieved by creating a style object `{ width: size, height: size }`.

2. **Style Merging:** The provided `style` prop is merged with the size-defining style object using array concatenation (`[{}, style]`). This allows users to override or add to the default sizing styles.  React Native's styling system handles merging these styles correctly, applying the user's styles last (overriding any conflicts).

3. **Prop Mapping:** The function directly maps the `name`, `weight`, and `color` props to the corresponding properties of the `SymbolView` component (`name`, `weight`, `tintColor`).  `tintColor` is used instead of `color` to match the `expo-symbols` library's naming convention.

4. **Resize Mode:** The `resizeMode` prop is set to `"scaleAspectFit"`. This ensures the icon maintains its aspect ratio while filling the specified `size`.


## 4. Example Usage

```jsx
<IconSymbol name="home" color="blue" size={32} />
<IconSymbol name="search" color="grey" style={{borderRadius: 10}} weight="bold"/>
```

## <a name="linked-table-of-contents">Linked Table of Contents</a>

* [1. Overview](#1-overview)
* [2. Component Signature](#2-component-signature)
* [3. Implementation Details](#3-implementation-details)
* [4. Example Usage](#4-example-usage)

