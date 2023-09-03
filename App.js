import { PersistGate } from 'redux-persist/integration/react';  // Persistgate to fetch state from AsyncStorage
import { AppRegistry } from 'react-native';                     // Entry point of the application
import { persistStore } from 'redux-persist';                   // PersistStore to store states in AsyncStorage
import { Provider } from 'react-redux';                         // Redux provider
import Navigator from './shared/stack'                          // Allows the user to navigate in the app
import store from './redux/store';                              // Redux store
import React from 'react';                                      // React

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

    AppRegistry.registerComponent('app', () => App);
    
    return( 
        <Provider store={store}>                     
            <PersistGate loading={null} persistor={persistor}>     
                <Navigator />
            </PersistGate>  
        </Provider>
    )
};