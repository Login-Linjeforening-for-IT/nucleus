import React from 'react';                                                  // React
import Navigator from './routes/stack';                                     // Navigation
import store from './redux/store';                                          // Redux store
import { Provider } from 'react-redux';                                     // Redux provider
import { PersistGate } from 'redux-persist/integration/react';              // Persistgate to fetch state from AsyncStorage
import { persistStore } from 'redux-persist';                               // PersistStore to store states in AsyncStorage
import { AppRegistry } from 'react-native';                                 // Entry point of the application
import { Alert } from 'react-native';

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 1/6
import messaging from '@react-native-firebase/messaging';                   // Notifications
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 1/6

let persistor = persistStore(store)                                         // Middleware to interact with AsyncStorage

/**
 * **Function for running the entire Login app**
 * 
 * Handles notifications while app is in background state
 * 
 * Provider allows the store to be used by any screen with navigation.
 * 
 * Persistgate is used for syncing Redux states with AsyncStorage
 * 
 * Navigator contains all screens and functionality to navigate between them
 * @returns Entire application
 */
export default function App() {  
    // COMMENT OUT THIS BOX WHILE TESTING IN EXPO 2/6
    messaging().setBackgroundMessageHandler(async remoteMessage => {        // FCM Background Handler
        Alert.alert('Recieved notification!', remoteMessage);
    });
    // COMMENT OUT THIS BOX WHILE TESTING IN EXPO 2/6

    AppRegistry.registerComponent('app', () => App);
    return( 
        <Provider store={store}>                     
            <PersistGate loading={null} persistor={persistor}>     
                <Navigator/>                                        
            </PersistGate>  
        </Provider>
    )
};