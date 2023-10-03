import { getDefaultConfig } from 'expo/metro-config'

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
    isCSSEnabled: true,
})

export default config
