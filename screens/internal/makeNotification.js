import { StatusBar } from 'expo-status-bar';
import { MS } from '../../styles/menuStyles';
import { GS } from '../../styles/globalStyles';
import React, { useState, useEffect, useRef } from 'react';
import { NotifyButton, Space } from '../../shared/sharedComponents';
import { T } from '../../styles/text';
import { useSelector } from 'react-redux';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView
} from 'react-native';
// import * as Notifications from 'expo-notifications';

// let isSettingNotificationHandler = false;

// async function setNotificationHandlerAsync() {
//   if (isSettingNotificationHandler) {
//     return;
//   }

//   isSettingNotificationHandler = true;
//   try {
//      Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: false,
//         shouldSetBadge: false,
//       }),
//     });
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isSettingNotificationHandler = false;
//   }
// }

{/* ========================= APP START ========================= */}
global.nTitle = "Login 💻"       // not being used, use array instead
global.nBody = "Varsling"       // not being used, use array instead
global.nDelay = 1               // not being used, use array instead

export default function MakeNotificationScreen({ navigation }) {

  const { lang  } = useSelector( (state) => state.lang  )

  const eventPage   = () => { navigation.navigate('EventScreen')    }
  const homePage    = () => { navigation.navigate('HomeScreen')     }
  const ProfilePage = () => { navigation.navigate('ProfileScreen')  }
  const goBack      = () => { navigation.navigate('InternalScreen') }
  const listingPage = () => { navigation.navigate('ListingScreen')  }

// const [expoPushToken, setExpoPushToken] = useState('');
// const [notification, setNotification] = useState(false);
// const notificationListener = useRef();
// const responseListener = useRef();

// --- THIS SECTION IS FOR WHEN THIS SCREEN IS REVISITIED --- 
// const [comittee, selectComittee] = useState({
//   selected: 0
// }) 

// const selectedComittee = (val) => {
//   selectComittee({
//     ...comittee,
//     selected: val,
//   });
// }
//
// const [filter, setFilter] = useState({input: null});                //  Filter text input declaration
//   const textInputRef = useRef(null);                                  //  Clears text input
//   const filterInput = (val) => {                                      //  --- UPDATES FILTER TEXT INPUT ---
//       setFilter({ 
//       ...filter,
//       input: val,
//       });
//   }
//  ref={textInputRef}
//  maxLength={40}
//  onPress={() => filterInput(null) + setRenderedArray([...events]) + setClickedCategory([]) + textInputRef.current.clear()}
// --- THIS SECTION IS FOR WHEN THIS SCREEN IS REVISITIED --- 

// useEffect(() => {
//   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//     setNotification(notification);
//   });

//   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//     console.log(response);
//   });

//   setNotificationHandlerAsync();

//   return () => {
//     Notifications.removeNotificationSubscription(notificationListener.current);
//     Notifications.removeNotificationSubscription(responseListener.current);
//   };
// }, []);

  return(
    <View>
      <StatusBar style="light" />
      <View style={MS.topMenu}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../../assets/goback777.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ProfilePage()}>
          <Image style={MS.tMenuIcon} source={require('../../assets/loginperson-orange.png')} />
        </TouchableOpacity>
    </View>
{/* ========================= DISPLAY CONTENT ========================= */}
  <View style={GS.content}>
    <ScrollView showsVerticalScrollIndicator={false}>

      {Space(5)}

      <Text style={T.centered}>{lang ? 'Send varsling' : 'Send notification'}</Text>{Space(10)}

      <Text style={T.centered20}>{lang ? 'Tittel' : 'Title'}</Text>

      {Space(5)}

      <TextInput 
        style={GS.inputText}
        placeholder='Login'
        placeholderTextColor={'#555'}
        textAlign='center'
        onChangeText={(val) => nTitle = (val)}
      />
      {Space(5)}

      <Text style={T.centered20}>{lang ? 'Beskrivelse' : 'Description'}</Text>{Space(5)}
      <TextInput 
        multiline
        style={GS.inputText}
        placeholder='Varsling'
        placeholderTextColor={'#555'}
        textAlign='center'
        onChangeText={(val) => nBody = (val)}
      />

      {Space(5)}

      <Text style={T.centered20}>Delay ({lang ? 'Sekunder': 'Seconds'})</Text>

      {Space(5)}

      <TextInput 
        style={GS.inputText}
        keyboardType='numeric'
        placeholder='1'
        placeholderTextColor={'#555'}
        textAlign='center'
        onChangeText={(val) => nDelay = (val)}
      />

      {Space(5)}

      {/* onPress={async () => {await schedulePushNotification();}} */}
      <TouchableOpacity> 
        <NotifyButton>
          <Text style={T.centered20}>{lang ? 'SEND VARSLING' : 'SEND NOTIFICATION'}</Text>
        </NotifyButton>
      </TouchableOpacity>

      <View>
        {Space(15)}
        <Image style={GS.smallImage} source={require('../../assets/loginText.png')} />
      </View>

      {Space(15)}
    </ScrollView>
  </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
    <View style={MS.bMenu}>
      <TouchableOpacity onPress={() => homePage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/house777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eventPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/calendar777.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => listingPage()}>
            <Image style={MS.bMenuIcon} source={require('../../assets/business.png')} />
          </TouchableOpacity>
      </View>     
    </View>
    
  )
};


// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: nTitle,
//       body: nBody,
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: nDelay }, // doesnt work
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }
//   if (finalStatus !== 'granted') {
//     alert('Failed to get push token for push notification!');
//     return;
//   }
//   token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log(token);

//   return token;
// }