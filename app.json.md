# Expo Configuration Documentation

[Linked Table of Contents](#linked-table-of-contents)

## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Data Structure](#2-data-structure)
* [3. Field Descriptions](#3-field-descriptions)
* [4. Plugin Configuration](#4-plugin-configuration)


## 1. Overview

This document details the structure and content of the Expo configuration file (`app.json` or `app.config.js` equivalent) used to configure the `barber.io` application.  The configuration is provided as a JSON object, defining various aspects of the application's behavior across different platforms (iOS, Android, and Web).  The configuration utilizes nested objects to organize settings logically.

## 2. Data Structure

The Expo configuration is a single JSON object with a top-level key `"expo"`.  This `"expo"` object contains various sub-objects, each specifying settings for different aspects of the application, as shown in the example below:

```json
{
  "expo": {
    // ... configuration details ...
  }
}
```

The structure is designed to be hierarchical and extensible, allowing for platform-specific configurations and the addition of new features without modifying the core structure.


## 3. Field Descriptions

The following table details the fields within the Expo configuration:

| Field             | Type             | Description                                                                                                         | Example Value                               | Notes                                                                  |
|----------------------|-------------------|---------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|-----------------------------------------------------------------------|
| `name`             | String           | The application's name.                                                                                             | `"barber.io"`                               | Used for display purposes.                                             |
| `slug`             | String           | A unique identifier for the application.                                                                              | `"barber.io"`                               | Should be consistent with the application's URL and directory structure. |
| `version`          | String           | The application's version number (Semantic Versioning recommended).                                                 | `"1.0.0"`                                   | Used for updates and version control.                                  |
| `orientation`      | String           | The default screen orientation.                                                                                      | `"portrait"`                                 | Can be `"portrait"`, `"landscape"`, or `"all"`.                         |
| `icon`             | String           | Path to the application's icon image.                                                                               | `"./assets/images/icon.png"`               | Should be a suitable image for all platforms.                    |
| `scheme`           | String           | The URL scheme used for deep linking.                                                                               | `"myapp"`                                   | Used to open the app from external links.                           |
| `userInterfaceStyle` | String           | Specifies the user interface style.                                                                                 | `"automatic"`                               | Can be `"automatic"`, `"light"`, or `"dark"`.                       |
| `newArchEnabled`    | Boolean          | Enables the new architecture for iOS and Android.                                                                     | `true`                                      | Improves performance and reduces bundle size.                      |
| `ios`              | Object           | iOS-specific configuration.                                                                                         | `{ "supportsTablet": true }`              | Contains options specific to iOS devices.                             |
| `android`          | Object           | Android-specific configuration.                                                                                     | `{ "adaptiveIcon": { ... } }`               | Contains options specific to Android devices.                         |
| `web`              | Object           | Web-specific configuration.                                                                                         | `{ "bundler": "metro", "output": "static", "favicon": "./assets/images/favicon.png" }` | Configures the web build process.                                  |
| `plugins`          | Array of strings or arrays | List of Expo plugins used by the application.                                                                     | `["expo-router", ["expo-splash-screen", {...}]]` | Each plugin can have its own configuration options.                 |
| `experiments`      | Object           | Enables experimental features.                                                                                     | `{ "typedRoutes": true }`                  | Use with caution, as experimental features might be unstable.             |


## 4. Plugin Configuration

The `plugins` array allows the inclusion of various Expo plugins. Each plugin can be specified as a string (for simple plugins) or an array containing the plugin name and its configuration object.


The `expo-splash-screen` plugin configuration example demonstrates this:

```json
[
  "expo-splash-screen",
  {
    "image": "./assets/images/splash-icon.png",
    "imageWidth": 200,
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  }
]
```

This configures the splash screen with a specific image, width, resize mode, and background color.  The configuration parameters are specific to the `expo-splash-screen` plugin and would differ for other plugins.  Consult the documentation for each individual plugin to understand its configuration options.
