import React from 'react';
import Navigator from './routes/stack';
import store from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
//import registerNNPushToken from 'native-notify';  

let persistor = persistStore(store)

export default function App() {
    //registerNNPushToken(4494, 'pfYoC5VY4KhZt9mrD3FGu0');
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigator/>
            </PersistGate>
        </Provider>
    )
};
