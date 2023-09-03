import React, { useEffect } from 'react';                       // React
import Navigator from './routes/stack';                         // Navigation
import store from './redux/store';                              // Redux store
import { Provider } from 'react-redux';                         // Redux provider
import { PersistGate } from 'redux-persist/integration/react';  // Persistgate to fetch state from AsyncStorage
import { persistStore } from 'redux-persist';                   // PersistStore to store states in AsyncStorage
import { Alert, AppRegistry } from 'react-native';              // Entry point of the application

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 1/6
import messaging from '@react-native-firebase/messaging';       // Notifications
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 1/6

let persistor = persistStore(store)                             // Middleware to interact with AsyncStorage

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

    // Handles background
    useEffect(() => {
        // Check whether the app was opened from a tapped notification
        const unsubscribeOnOpen = messaging().onNotificationOpenedApp((remoteMessage) => {
            Alert.alert('Notification caused app to open from background state:', remoteMessage);
            // Handle the interaction
        });

        // Check if the app was opened by a notification when it was terminated
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
            if (remoteMessage) {
                Alert.alert('Notification caused app to open from a terminated state:', remoteMessage);
                // Handle the interaction
            }
            });

        return unsubscribeOnOpen;
    })

    // Handles foreground
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async(remoteMessage) => {
            Alert.alert("Recieved new message", JSON.stringify(remoteMessage))
            // Handles notifications recieved while the app is in the foreground
        })

        return unsubscribe
    }, [])
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