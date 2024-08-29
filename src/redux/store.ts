import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import NotificationReducer from "@redux/notifications"
import { persistReducer } from "redux-persist"
import LoginReducer from "@redux/loginStatus"
import ProfileReducer from "@redux/profile"
import ThemeReducer from "@redux/theme"
import EventReducer from "@redux/event"
import LangReducer from "@redux/lang"
import MiscReducer from "@redux/misc"
import AdReducer from "@redux/ad"
import { thunk } from "redux-thunk"
import createMigrate from "redux-persist/es/createMigrate"
import { version } from "react"

// Combines all reducers
const reducers = combineReducers({
    // Theme reducer
    theme: ThemeReducer,
    // Language reducer
    lang: LangReducer,
    // Loginstatus reducer
    login: LoginReducer,
    // Notification reducer
    notification: NotificationReducer,
    // Miscellaneous, only used for calendarID at this time
    misc: MiscReducer,
    // Profile reducer, handles all user specific information
    profile: ProfileReducer,
    // Event reducer, handles all event logic
    event: EventReducer,
    // Ad reducer, handles all ad logic
    ad: AdReducer
})

const migrations = createMigrate({
    // Version 0
    0: (state) => {
        // Returns the state
        return state
    }
})

  // Function to localstore redux state
const saveState = {
    // Key property: root
    key: "root",
    //Version that neeeds to be updated every time the state is changed
    version: 0,
    // Declares which storage to use, AsyncStorage has most active community
    storage: AsyncStorage,
    // Whitelists the names of the states to save
    whitelist: [
        "ad",
        "event", 
        "lang",
        "login",
        "misc",
        "notification",
        "profile",
        "theme"
    ],
    migration: migrations
}

// Persistor to remember the state
const persistedReducer = persistReducer(saveState, reducers)

// Function to configure the store
const Store = configureStore({
    // The combinded reducer
    reducer: persistedReducer,
    // Middleware to interact with AsyncStorage (must be of any type due to underlying API type error)
    middleware: () => [thunk] as any
})

// Exporting the full Redux Store
export default Store
