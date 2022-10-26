import React from 'react';
import Navigator from './routes/homeStack';

export default function App() {
    return(
        <Navigator/>
    )
};



// import React from 'react';
// import Navigator from './routes/homeStack';
// import { useEffect, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//     const [usersData,setUsersData]=useState([])
//   const getData=()=>{
//     fetch('https://api.login.no/events')
//     .then(response=>response.json())
//     .then(data=>setUsersData(data));
//   }
      
      
//       useEffect(() => {
//         getData();
//       },[])

//       return (
//         <View style={styles.container}>
//           {usersData.map(_user=><Text key={_user.eventID}>{_user.eventID}</Text>)}
//         </View>
//       );
// };

// const styles = StyleSheet.create({
//     size: {
//         height: 20,
//         width: 20

//     },
//     container: {
//         height: 50,
//         width: 50,
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
// });