import Notification from '../functions/notification';
import FetchColor from '../../styles/fetchTheme';
import { GS } from '../../styles/globalStyles';
import { View, Text } from 'react-native';                                                                  // React native
import { useSelector } from 'react-redux';
import Card from '../functions/card';
import Cluster from '../functions/cluster';
import { useState, useEffect } from 'react';

/**
 * Switch for notification intervals on SES.
 * 
 * @topic Topic user should be subscribed to, or unsubscribed from
 * @returns Visual representation of switch as a cluster
 */
export default function topicSwitch(topic, textNo, textEn) {
  const { lang  } = useSelector( (state) => state.lang  )
  const { theme } = useSelector( (state) => state.theme )
  
  return(
    <Cluster>
        <View style={GS.notificationBack}>
            <View style={GS.view}>
            <Text style={{...GS.notificationText, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{lang ? textNo : textEn}</Text>
            </View>
            <View style={GS.view2}>{Notification(topic, 1)}</View>
        </View>
    </Cluster>
  )
};