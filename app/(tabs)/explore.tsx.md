# TabTwoScreen Component Documentation

## Table of Contents

* [1. Overview](#1-overview)
* [2. Component Structure](#2-component-structure)
* [3.  Styling](#3-styling)
* [4.  External Libraries and Components](#4-external-libraries-and-components)


## 1. Overview

The `TabTwoScreen` component renders the content for the "Explore" tab within a React Native application.  It utilizes a parallax scrolling effect for an enhanced user experience and displays information categorized within collapsible sections. Each section provides a brief explanation of a topic with links to external documentation for further details.


## 2. Component Structure

The `TabTwoScreen` component is built using the following structure:

| Component          | Purpose                                                                   |
|----------------------|-------------------------------------------------------------------------------|
| `ParallaxScrollView` | Provides a parallax scrolling effect with a customizable header.             |
| `ThemedView`         | Wraps content to apply theme-based styling.                               |
| `ThemedText`         |  Renders text with theme-aware styling and supports different text types (title, link, etc.).          |
| `Collapsible`         | Displays collapsible sections with titles and content.                       |
| `ExternalLink`       | Creates clickable links to external resources.                             |
| `IconSymbol`         | Renders an icon from a specified icon library.                            |
| `Image`              | Displays static images.                                                      |


The main content is organized into several collapsible sections, each focusing on a specific aspect of the application:

* **File-based routing:** Explains the file structure used for routing within the application.
* **Android, iOS, and web support:** Highlights the cross-platform compatibility of the application.
* **Images:** Describes how to include and manage static images, including using `@2x` and `@3x` suffixes for different screen densities.
* **Custom fonts:** Explains how to load and utilize custom fonts.
* **Light and dark mode components:** Discusses the implementation of light and dark mode support using the `useColorScheme()` hook.
* **Animations:** Shows an example of an animated component using the `react-native-reanimated` library and mentions the parallax effect implemented in the header.


A conditional rendering based on the platform (`Platform.select`) is used to display additional information about the parallax effect on iOS only.


## 3. Styling

The component uses a `StyleSheet` to define styles for its elements.

| Style Name      | Properties                                       | Purpose                                         |
|-----------------|---------------------------------------------------|-----------------------------------------------------|
| `headerImage`   | `color`, `bottom`, `left`, `position`            | Styles the icon used as the parallax header image. |
| `titleContainer` | `flexDirection`, `gap`                           | Styles the container for the title.                 |


## 4. External Libraries and Components

The `TabTwoScreen` component leverages several external libraries and custom components:

* **`react-native`:** Core React Native library.
* **`@/components/Collapsible`:** A custom component for creating collapsible sections.
* **`@/components/ExternalLink`:** A custom component for creating clickable external links.
* **`@/components/ParallaxScrollView`:** A custom component that implements parallax scrolling.
* **`@/components/ThemedText`:** A custom component for theme-aware text rendering.
* **`@/components/ThemedView`:** A custom component for theme-aware view rendering.
* **`@/components/ui/IconSymbol`:** A custom component for rendering icons.
* **`react-native-reanimated`:** Used for creating animations (mentioned within the "Animations" section).  The specific implementation is within the `components/HelloWave.tsx` component (not shown in the provided code snippet).

The `ParallaxScrollView` component, although not fully defined in this snippet, is crucial for providing the parallax scrolling effect on the header image.  Its functionality is described within the component’s documentation, which is not included here.
