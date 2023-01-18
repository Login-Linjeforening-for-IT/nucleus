import React from 'react';                                                  // React
import Navigator from './routes/stack';                                     // Navigation
import store from './redux/store';                                          // Redux store
import { Provider } from 'react-redux';                                     // Redux provider
import { PersistGate } from 'redux-persist/integration/react';              // Persistgate to fetch state from AsyncStorage
import { persistStore } from 'redux-persist';                               // PersistStore to store states in AsyncStorage
import { AppRegistry } from 'react-native';                                 // Entry point of the application
import messaging from '@react-native-firebase/messaging';                   // Notifications

let persistor = persistStore(store)                                         // Middleware to interact with AsyncStorage

/**
 * **Function for running the entire Login app**
 * 
 * NNPushToken registers the native-notify token used for remote push notifications
 * 
 * Provider allows the store to be used by any screen with navigation.
 * 
 * Persistgate is used for syncing Redux states with AsyncStorage
 * 
 * Navigator contains all screens and functionality to navigate between them
 * @returns The app
 */
export default function App() {  
    messaging().setBackgroundMessageHandler(async remoteMessage => {        // FCM Background Handler
        console.log('Message handled in the background!', remoteMessage);
    });
  
    AppRegistry.registerComponent('app', () => App);
    return( 
        <Provider store={store}>                     
            <PersistGate loading={null} persistor={persistor}>     
                <Navigator/>                                        
            </PersistGate>  
        </Provider>
    )
};