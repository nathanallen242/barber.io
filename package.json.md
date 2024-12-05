# barber.io Project Code Documentation

[Linked Table of Contents](#table-of-contents)

## <a name="table-of-contents"></a>Table of Contents

* [1. Project Overview](#1-project-overview)
* [2. Package.json Analysis](#2-packagejson-analysis)
    * [2.1 Dependencies](#21-dependencies)
    * [2.2 DevDependencies](#22-devdependencies)
    * [2.3 Scripts](#23-scripts)
* [3.  Jest Configuration](#3-jest-configuration)


## <a name="1-project-overview"></a>1. Project Overview

This document provides internal code documentation for the `barber.io` project,  as defined in the `package.json` file. The project utilizes Expo for cross-platform mobile development (Android, iOS, and Web).  It employs React Native for the UI and React Navigation for navigation management.


## <a name="2-packagejson-analysis"></a>2. `package.json` Analysis

The `package.json` file describes the project's metadata, dependencies, and scripts.

### <a name="21-dependencies"></a>2.1 Dependencies

This section lists the project's runtime dependencies.  These packages are required for the application to function correctly.

| Package Name                     | Version      | Description                                                                        |
|---------------------------------|---------------|------------------------------------------------------------------------------------|
| `@expo/vector-icons`            | ^14.0.2       | Provides various vector icons.                                                    |
| `@react-navigation/bottom-tabs` | ^7.0.0       | Enables bottom tab navigation.                                                    |
| `@react-navigation/native`     | ^7.0.0       | Core React Navigation library for native platforms.                              |
| `expo`                           | ~52.0.17      | The Expo framework.                                                              |
| `expo-blur`                     | ~14.0.1       | Adds blur effect capabilities.                                                    |
| `expo-constants`                | ~17.0.3      | Provides access to device and environment constants.                             |
| `expo-font`                     | ~13.0.1      | Manages font loading.                                                            |
| `expo-haptics`                  | ~14.0.0      | Provides haptic feedback functionality.                                           |
| `expo-linking`                  | ~7.0.3       | Handles deep linking.                                                             |
| `expo-router`                   | ~4.0.11      | Expo's router for simplified navigation.                                          |
| `expo-splash-screen`            | ~0.29.15     | Manages the splash screen.                                                        |
| `expo-status-bar`               | ~2.0.0       | Controls the status bar appearance.                                               |
| `expo-symbols`                  | ~0.2.0       | Provides access to system symbols.                                                |
| `expo-system-ui`                | ~4.0.5       | Allows customization of system UI elements.                                      |
| `expo-web-browser`              | ~14.0.1      | Enables in-app web browser functionality.                                         |
| `react`                          | 18.3.1       | The React library.                                                              |
| `react-dom`                     | 18.3.1       | React DOM for web support.                                                        |
| `react-native`                  | 0.76.3       | The React Native core library.                                                    |
| `react-native-gesture-handler` | ~2.20.2      | Provides gesture handling capabilities.                                            |
| `react-native-reanimated`       | ~3.16.1      | Enables advanced animations.                                                     |
| `react-native-safe-area-context`| 4.12.0       | Manages safe area insets.                                                         |
| `react-native-screens`          | ~4.1.0       | Provides screen management for better performance.                               |
| `react-native-web`              | ~0.19.13     | Enables web support for React Native components.                                 |
| `react-native-webview`          | 13.12.5     | Integrates a webview component.                                                   |


### <a name="22-devdependencies"></a>2.2 DevDependencies

These packages are used during development and testing, but are not included in the production build.

| Package Name             | Version      | Description                                      |
|--------------------------|---------------|--------------------------------------------------|
| `@babel/core`           | ^7.25.2       | Babel compiler for JavaScript transpilation.     |
| `@types/jest`           | ^29.5.12      | TypeScript type definitions for Jest.            |
| `@types/react`          | ~18.3.12     | TypeScript type definitions for React.           |
| `@types/react-test-renderer` | ^18.3.0       | TypeScript type definitions for React Test Renderer.|
| `jest`                   | ^29.2.1       | JavaScript testing framework.                    |
| `jest-expo`              | ~52.0.2      | Expo integration for Jest.                       |
| `react-test-renderer`   | 18.3.1       | React renderer for testing.                      |
| `typescript`             | ^5.3.3       | TypeScript compiler.                             |


### <a name="23-scripts"></a>2.3 Scripts

The `scripts` section defines shortcuts for common development tasks.

| Script Name       | Command                               | Description                                    |
|--------------------|---------------------------------------|------------------------------------------------|
| `start`           | `expo start`                           | Starts the Expo development server.            |
| `reset-project`   | `node ./scripts/reset-project.js`     | Resets the project (custom script).          |
| `android`         | `expo start --android`                 | Starts the Expo development server for Android.|
| `ios`             | `expo start --ios`                    | Starts the Expo development server for iOS.    |
| `web`             | `expo start --web`                     | Starts the Expo development server for web.    |
| `test`            | `jest --watchAll`                      | Runs Jest tests with watch mode.              |
| `lint`            | `expo lint`                            | Runs the Expo linter.                         |


## <a name="3-jest-configuration"></a>3. Jest Configuration

The `jest` section configures the Jest testing framework:

```json
  "jest": {
    "preset": "jest-expo"
  },
```

This configuration utilizes the `jest-expo` preset, which is specifically tailored for Expo projects.  This preset handles the setup and configuration required for testing React Native components within the Expo environment.  It automatically handles aspects like mocking native modules and configuring the test environment to work seamlessly with the Expo project structure.
