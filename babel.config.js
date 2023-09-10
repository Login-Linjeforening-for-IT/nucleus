module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
    //   presets: ['module:metro-react-native-babel-preset'],
    "plugins": [
        'react-native-reanimated/plugin',
        ["module-resolver", {
            "alias": {
                "@components": "./src/shared/components",
                "@interfaces": "./interfaces.ts",
                "@themes": "./src/styles/themes",
                "@assets": "./public/assets",
                "@text": "./public/locales",
                "@screens": "./src/screens",
                "@shared": "./src/shared",
                "@styles": "./src/styles",
                "@redux": "./src/redux",
                "@nav": "./src/nav",
                "@": "./src/",
            }
        }]
    ],
    };
  };
  
  