// Imports default configuration function from '@react-native/metro-config'
const { getDefaultConfig } = require('@react-native/metro-config')

// Imports the Expo Metro configuration function
const { getDefaultConfig: getExpoDefaultConfig } = require('expo/metro-config')

/** @type {import('metro-config').MetroConfig} */
// Merges the configurations from both '@react-native/metro-config' and Expo
const config = getExpoDefaultConfig(__dirname)

// Enables css support
config.resolver.sourceExts.push('css')

// Exports the merged configuration
module.exports = {
    ...getDefaultConfig(__dirname),
    ...config,
}
