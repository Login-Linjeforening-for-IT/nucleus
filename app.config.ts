import { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    owner: "loginapp",
    name: "Login",
    description: "Login - Linjeforeningen for IT, now as an app! We want to make it even easier to get in touch with the login, and stay up to date on events even when you are offline. The app contains all events, feed and job advertisements.",
    slug: "Login",
    version: "2.1.9",
    orientation: "portrait",
    githubUrl:"https://github.com/Login-Linjeforening-for-IT/nucleus",
    platforms: [
        "ios",
        "android"
    ],
    icon: "./public/assets/logo/icon.png",
    userInterfaceStyle: "dark",
    backgroundColor: "#000000",
    primaryColor: "#000000",
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
        [
        "@react-native-firebase/app"
        ],
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
        googleServicesFile: process.env.ENVIROMENT === 'production' ? 'GoogleService-Info.plist' : 'GoogleService-Info-dev.plist',
        buildNumber: "96",
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
        versionCode: 75,
        googleServicesFile: process.env.ENVIROMENT === 'production' ? 'google-services.json' : 'google-services-dev.json',
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.login.Login",
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
        policy: "appVersion"
    }
});
