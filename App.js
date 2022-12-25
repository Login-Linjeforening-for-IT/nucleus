import React from 'react';                                          // React
import Navigator from './routes/stack';                             // Navigation
import store from './redux/store';                                  // Redux store
import { Provider } from 'react-redux';                             // Redux provider
import { PersistGate } from 'redux-persist/integration/react';      // Persistgate to fetch state from AsyncStorage
import { persistStore } from 'redux-persist';                       // PersistStore to store states in AsyncStorage
//import registerNNPushToken from 'native-notify';                  // Push notification key (inactive, needs to be revised)

let persistor = persistStore(store)                                 // Middleware to interact with AsyncStorage

export default function App() {                                     // Exports the app with all functions (main gate / index file)
    //registerNNPushToken(4494, 'pfYoC5VY4KhZt9mrD3FGu0');          // Registers push token (inactive, needs to be revised)
    return( 
        <Provider store={store}>                                    {/** Allows the store to be used by any screen with navigation */}
            <PersistGate loading={null} persistor={persistor}>      {/** Gate for syncing redux state with AsyncStorage */}
                <Navigator/>                                        {/** All navigation functionality and all screens */}
            </PersistGate>  
        </Provider>
    )
};
