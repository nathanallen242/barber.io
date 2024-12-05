# Internal Code Documentation: `ExternalLink` Component

[Linked Table of Contents](#linked-table-of-contents)

## 1. Overview

The `ExternalLink` component is a React Native component that renders a link that opens in an external browser.  It utilizes `expo-router`'s `Link` component to handle the link rendering and leverages `expo-web-browser` to open URLs in an appropriate manner depending on the platform.

## 2. Component Structure

The `ExternalLink` component is a wrapper around the `expo-router`'s `Link` component.  This allows it to retain most of the functionality of a standard link while adding platform-specific behavior for opening external URLs.

### 2.1 Type Definitions

The component uses a type alias `Props` which is defined as:

```typescript
type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };
```

This ensures that all props of the `Link` component are available except for `href`, which is explicitly added with a string type. This allows for customisation of the link while ensuring the `href` attribute is always provided.

### 2.2 Function Implementation: `ExternalLink({ href, ...rest }: Props)`

The core logic resides within the `onPress` handler of the `Link` component:

```javascript
onPress={async (event) => {
  if (Platform.OS !== 'web') {
    // Prevent the default behavior of linking to the default browser on native.
    event.preventDefault();
    // Open the link in an in-app browser.
    await openBrowserAsync(href);
  }
}}
```

This function checks the operating system. If it's not a web platform (i.e., iOS or Android), it prevents the default link behavior which would open the URL in the device's default browser. Instead, it uses `openBrowserAsync(href)` from `expo-web-browser` to open the URL within an in-app browser provided by Expo. This provides a better user experience by keeping the user within the application.


## 3. Algorithm Description

The component's core logic follows a simple conditional algorithm:

| Condition                     | Action                                                              |
|---------------------------------|----------------------------------------------------------------------|
| `Platform.OS` is 'web'         | Uses default browser behavior (handled by `expo-router`'s `Link`).   |
| `Platform.OS` is not 'web'     | Prevents default behavior (`event.preventDefault()`), then opens the URL using `openBrowserAsync(href)`. |


## 4. Dependencies

*   `expo-router`: For rendering the link element.
*   `expo-web-browser`: For opening URLs in an in-app browser on non-web platforms.
*   `react`: For React component functionality.
*   `react-native`: For React Native platform specifics.


<a name="linked-table-of-contents"></a>
## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
    * [2.1 Type Definitions](#21-type-definitions)
    * [2.2 Function Implementation: `ExternalLink({ href, ...rest }: Props)`](#22-function-implementation-externallink-href-rest-props)
* [3. Algorithm Description](#3-algorithm-description)
* [4. Dependencies](#4-dependencies)

