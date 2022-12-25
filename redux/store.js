import { combineReducers, configureStore } from '@reduxjs/toolkit';     // Configures the store
import { persistReducer } from 'redux-persist';                         // Saves the store state in storage
import ThemeReducer from './theme';                                     // Theme state
import LangReducer from './lang';                                       // Lang state
import LoginReducer from './loginStatus'                                // Loginstatus (verv)
import AsyncStorage from '@react-native-async-storage/async-storage';   // Localstorage
import thunk from 'redux-thunk';                                        // Middleware

const reducers = combineReducers({                                      // Combines all reducers
    theme: ThemeReducer,                                                // Theme reducer
    lang: LangReducer,                                                  // Language reducer
    login: LoginReducer,                                                // Loginstatus reducer
  });

const saveState = {                                                     // Function to localstore redux state
    key: 'root',                                                        // Key property: root
    storage: AsyncStorage,                                              // Which storage to use, AsyncStorage has most active community
    whitelist: ['lang', 'login', 'theme']                               // Whitelists the names of the states to save
}
  
const persistedReducer = persistReducer(saveState, reducers);           // Persistor to remember the state

const Store = configureStore({                                          // Function to configure the store
    reducer: persistedReducer,                                          // The combinded reducer
    middleware: [thunk]                                                 // Middleware to interact with AsyncStorage
})

export default Store;                                                   // Exporting the full Redux Store