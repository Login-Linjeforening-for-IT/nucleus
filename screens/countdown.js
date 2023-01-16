import { GS } from '../styles/globalStyles'
import React, {useEffect, useState} from 'react';
import { T } from '../styles/text'
import { StatusBar } from 'expo-status-bar';
import { NotificationDelay } from '../shared/eventComponents/notificationDelay';
import { 
  Text, 
  View, 
  Image, 
} from 'react-native';

export default function CountdownScreen() {
return(
  <View>
      <StatusBar hidden={true}/>
      <View style={{...GS.content, backgroundColor: 'black'}}>
          <View style={{...T.centeredBold20, flex: 1, justifyContent: 'center'}}>
            <Text style={{...T.centeredBold25, color: 'white'}}>Nucleus</Text>
            <Text style={{...T.centeredBold25, color: 'white'}}><Countdown props={startt="2023-02-11T00:00:00Z"}/></Text>
          </View>
      </View>    
    </View>
    
  )
};

function Countdown(props) {
  const [timer, setTimer] = useState(NotificationDelay(props));
  useEffect(() => {
    const interval = setInterval(() => {                                          
      setTimer(NotificationDelay(props));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  var days = Math.floor(timer/86400)
  var hour = 1 + Math.floor((timer%86400)/3600)
  var minutes = Math.floor(((timer%86400)%3600)/60)
  var seconds = ((timer%86400)%3600)%60
  var countdown = days + ' ' + hour + ' ' + minutes + ' ' + seconds
  return countdown;
}