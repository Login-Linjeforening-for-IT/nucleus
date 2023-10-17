module.exports = function(api) {
    api.cache(true)

    return {
        presets: ['babel-preset-expo'],
        "plugins": [
            'react-native-reanimated/plugin',
            ["module-resolver", {
                "alias": {
                    "@components": "./src/components",
                    "@interfaces": "./interfaces.ts",
                    "@themes": "./src/styles/themes",
                    "@assets": "./public/assets",
                    "@text": "./public/text",
                    "@screens": "./src/screens",
                    "@utils": "./src/utils",
                    "@shared": "./src/shared",
                    "@styles": "./src/styles",
                    "@redux": "./src/redux",
                    "@nav": "./src/components/nav",
                    "@": "./src/",
                }
            }]
        ],
    }
}
