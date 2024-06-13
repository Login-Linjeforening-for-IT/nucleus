import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { AppRegistry } from "react-native"
import { Provider } from "react-redux"
import Navigator from "@nav/tabs"
import store from "@redux/store"
import React from "react"
import ForceUpdate from "@components/menu/forceUpdate"

let persistor = persistStore(store)

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
 *
 * @returns Entire application
 */
export default function App() {

    AppRegistry.registerComponent("app", () => App)

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* <ForceUpdate /> */}
                <Navigator />
            </PersistGate>
        </Provider>
    )
}
