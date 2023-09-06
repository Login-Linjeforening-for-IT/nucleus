import AsyncStorage from '@react-native-async-storage/async-storage';   // Localstorage
import { combineReducers, configureStore } from '@reduxjs/toolkit';     // Configures the store
import NotificationReducer from 'login/redux/notifications'                       // Notification states
import { persistReducer } from 'redux-persist';                         // Saves the store state in storage
import LoginReducer from 'login/redux/loginStatus'                                // Loginstatus (verv)
import ThemeReducer from 'login/redux/theme';                                     // Theme state
import LangReducer from 'login/redux/lang';                                       // Lang state
import MiscReducer from 'login/redux/misc';                                       // Misc items
import ProfileReducer from 'login/redux/profile'                                  // Profile items
import thunk from 'redux-thunk';                                        // Middleware

const reducers = combineReducers({                                      // Combines all reducers
    theme: ThemeReducer,                                                // Theme reducer
    lang: LangReducer,                                                  // Language reducer
    login: LoginReducer,                                                // Loginstatus reducer
    notification: NotificationReducer,                                  // Notification reducer
    misc: MiscReducer,
    profile: ProfileReducer
  });

const saveState = {                                                     // Function to localstore redux state
    key: 'root',                                                        // Key property: root
    storage: AsyncStorage,                                              // Which storage to use, AsyncStorage has most active community
    whitelist: ['lang', 'login', 'theme', 'notification', 'misc', 'profile']       // Whitelists the names of the states to save
}
  
const persistedReducer = persistReducer(saveState, reducers);           // Persistor to remember the state

const Store = configureStore({                                          // Function to configure the store
    reducer: persistedReducer,                                          // The combinded reducer
    middleware: [thunk]                                                 // Middleware to interact with AsyncStorage
})

export default Store;                                                   // Exporting the full Redux Store