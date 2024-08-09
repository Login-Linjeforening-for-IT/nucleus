import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'Login',
    slug: 'Login',
    ios: {
        googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST,
        ...config.ios
    },
    android: {
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
        ...config.android
    }
});