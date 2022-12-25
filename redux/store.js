import { combineReducers, configureStore } from '@reduxjs/toolkit';     // Configures the store
import { persistStore, persistReducer } from 'redux-persist';           // Saves the store state in storage
import ThemeReducer from './theme';                                     // Theme state
import LangReducer from './lang';                                       // Lang state
import LoginReducer from './loginStatus'                                // Loginstatus (verv)
import AsyncStorage from '@react-native-async-storage/async-storage';   // Localstorage
import thunk from 'redux-thunk';                                        // Middleware

const reducers = combineReducers({
    theme: ThemeReducer,
    lang: LangReducer,
    login: LoginReducer,
  });

const saveState = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['lang', 'login', 'theme']
}
  
const persistedReducer = persistReducer(saveState, reducers);

const Store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export default Store;