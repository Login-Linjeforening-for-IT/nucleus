import React from 'react';
import Navigator from './routes/stack';
import store from './redux/store';
import { Provider } from 'react-redux';
//import registerNNPushToken from 'native-notify';  

export default function App() {
    //registerNNPushToken(4494, 'pfYoC5VY4KhZt9mrD3FGu0');
    return(
        <Provider store={store}>
            <Navigator/>
        </Provider>
    )
};
