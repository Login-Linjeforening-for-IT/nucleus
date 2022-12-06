import React from 'react';
import Navigator from './routes/homeStack';
//import registerNNPushToken from 'native-notify';  - temporarily disabled due to bug

export default function App() {
    //registerNNPushToken(4494, 'pfYoC5VY4KhZt9mrD3FGu0');
    return(
        <Navigator/>
    )
};
