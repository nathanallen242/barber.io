import dotenv from 'dotenv';

dotenv.config();

export default {
  "expo": {
    "name": "barber-io",
    "slug": "barber-io",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "googleServicesFile": process.env.GOOGLE_SERVICES_PLIST,
      "infoPlist": {
        "NSCalendarsUsageDescription": "The app needs to access your calendar.",
        "NSRemindersUsageDescription": "Allow $(PRODUCT_NAME) to access your reminders",
        "NSCalendarsFullAccessUsageDescription": "The app needs to access your calendar.",
        "NSRemindersFullAccessUsageDescription": "Allow $(PRODUCT_NAME) to access your reminders"
      },
      "bundleIdentifier": "com.barber-io",
      "runtimeVersion": {
        "policy": "appVersion"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.READ_CALENDAR",
        "android.permission.WRITE_CALENDAR"
      ],
      "package": "com.nathan_242.barberio",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
      "runtimeVersion": "1.0.0"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [ 
        "@react-native-google-signin/google-signin",
        {
          "permissions": [
            "email",
            "profile",
            "openid",
            "https://www.googleapis.com/auth/calendar"
          ],
          "scopes": [
            "https://www.googleapis.com/auth/calendar"
          ]
        }
      ],
      [
      "expo-calendar",
        {
          "calendarPermission": "The app needs to access your calendar."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "47a510e9-cd0d-4bc7-a9f7-3b42c1e8e239"
      }
    },
    "updates": {
      "url": "https://u.expo.dev/47a510e9-cd0d-4bc7-a9f7-3b42c1e8e239"
    }
  }
}
