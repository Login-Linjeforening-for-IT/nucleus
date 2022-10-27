import { StatusBar } from 'expo-status-bar';
import { MS } from '../styles/menuStyles';
import { SS } from '../styles/settingStyles';
import { CS } from '../styles/contactStyles';
import { GS } from '../styles/globalStyles';
import React, { useState, useEffect, useRef, replace } from 'react';
import { T } from '../styles/text';
import Card from '../shared/card';
import { 
  Text, 
  View, 
  Image, 
  TouchableOpacity,
  Button, 
  Platform,
  TextInput
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

{/* ========================= APP START ========================= */}
global.nTitle = 'Login 💻'
global.nBody = 'Varsling'
global.nDelay = 1

export default function MakeNotificationScreen({ navigation }) {
{/* ========================= DISPLAY APP START ========================= */}
const eventPage = () => {
  navigation.navigate('EventScreen');
}
const homePage = () => {
  navigation.navigate('HomeScreen');
}
const goBack = () => {
    navigation.goBack()
}
// const [title, setTitle] = useState('title');
// const [body, setBody] = useState('body');
const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();

useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);

  return(
    <View style={MS.top}>
      <StatusBar style="light" />
      <View style={MS.top}>
      <TouchableOpacity onPress={() => goBack()}>
          <Image style={MS.goBack} source={require('../assets/goback999.png')} />
        </TouchableOpacity>
      </View>
{/* ========================= DISPLAY CONTENT ========================= */}
      <View style={SS.makeNotification}>
        <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={T.centered}>Send varsling</Text><Text/><Text/><Text/>

                    <Text style={T.centered20}>Tittel</Text><Text/>
                    <TextInput 
                      style={GS.inputText}
                      placeholder='Login'
                      placeholderTextColor={'#555'}
                      textAlign='center'
                      onChangeText={(val) => nTitle = (val)}
                    /><Text/>

              <Text style={T.centered20}>Beskrivelse</Text><Text/>
                    <TextInput 
                      multiline
                      style={GS.inputText}
                      placeholder='Varsling'
                      placeholderTextColor={'#555'}
                      textAlign='center'
                      onChangeText={(val) => nBody = (val)}
                    />
                    
                <Text/>

                <Text style={T.centered20}>Delay (sekunder)</Text><Text/>
                    <TextInput 
                      style={GS.inputText}
                      keyboardType='numeric'
                      placeholder='1'
                      placeholderTextColor={'#555'}
                      textAlign='center'
                      onChangeText={(val) => nDelay = (val)}
                    /><Text/>

                <Button
                color={'red'}
                title="Send varsling"
                onPress={async () => {
                await schedulePushNotification();
                }}
                /><Text/>
                
              {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={T.h5}>Tittel:</Text>
                <Text style={T.h5}>{notification && notification.request.content.title} </Text>
                <Text style={T.h5}>Beskrivelse:</Text>
                <Text style={T.h5}>{notification && notification.request.content.body}</Text><Text/>
                <Text style={T.h5}>Delay:</Text> */}
                {/* <Text style={T.h5}>{notification && notification.request.content.trigger} </Text><Text/> */}
                {/* <Text style={T.h5}>Data: {notification && JSON.stringify(notification.request.content.data)}</Text> */}
               
                <Text/><Text/><Text/><Text/>
                <View style={SS.makeNotificationImage}>
                  <Image style={CS.image} source={require('../assets/login-text.png')} />
                </View>
              {/* </View> */}
              <Text/><Text/><Text/>
      







</ScrollView>
      </View>    

{/* ========================= DISPLAY BOTTOM MENU ========================= */}
      <View style={MS.bMenuUniversal}>
      <TouchableOpacity onPress={() => homePage()}>
          <Image style={MS.bMenu3} source={require('../assets/home777.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => eventPage()}>
        <Image style={MS.bMenu2} source={require('../assets/menu777.png')} />
        </TouchableOpacity>
          <Image style={MS.settingsSelected} source={require('../assets/settings-orange.png')} />
        
      </View>     
    </View>
    
  )
};


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: nTitle,
      body: nBody,
      data: { data: 'goes here' },
    },
    trigger: { seconds: nDelay },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}