import registerRootComponent from 'expo/build/launch/registerRootComponent'
import App from './src/App'

// registerRootComponent calls AppRegistry.registerComponent("main", () => App)
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App)

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent("app", () => App)