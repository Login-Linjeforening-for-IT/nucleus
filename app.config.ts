import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    owner: "loginapp",
    name: "Login",
    slug: "Login",
    version: "2.1.10",
    orientation: "portrait",
    icon: "./public/assets/logo/icon.png",
    userInterfaceStyle: "dark",
    splash: {
        image: "./public/assets/logo/splash.png",
        resizeMode: "contain",
        backgroundColor: "#000000"
    },
    updates: {
        fallbackToCacheTimeout: 0,
        url: "https://u.expo.dev/952a1914-0c53-43e7-b64e-8daab0b3a435"
    },
    plugins: [
        ["@react-native-firebase/app"],
        [
            "expo-calendar",
            {
                calendarPermission: "Login wants to save events to your calendar."
            }
        ],
        [
            "expo-build-properties",
            {
                ios: {
                    useFrameworks: "static"
                }
            }
        ],
        [
            "expo-image-picker",
            {
                photosPermission: "Login needs photo access if you want a profile picture.",
                cameraPermission: "Login needs camera access if you want to take a selfie."
            }
        ]
    ],
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.eirikhanasand.Login",
        buildNumber: config.ios?.buildNumber,
        googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST || "./GoogleService-Info.plist",
        infoPlist: {
            UIBackgroundModes: [
                "fetch",
                "remote-notification"
            ]
        }
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./public/assets/logo/adaptiveIcon.png",
            backgroundColor: "#000000"
        },
        package: "com.login.Login",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
        versionCode: config.android?.versionCode,
        permissions: [
            "INTERNET",
            "NOTIFICATIONS",
            "PUSH_NOTIFICATIONS",
            "READ_CALENDAR",
            "WRITE_CALENDAR"
        ],
        softwareKeyboardLayoutMode: "pan"
    },
    web: {
        favicon: "./public/assets/logo/favicon.ico"
    },
    extra: {
        eas: {
            projectId: "952a1914-0c53-43e7-b64e-8daab0b3a435"
        }
    },
    runtimeVersion: {
        policy: "sdkVersion"
    }
});
