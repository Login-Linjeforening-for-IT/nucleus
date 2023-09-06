import Notification from 'login/shared/functions/notification';
import FetchColor from 'login/styles/fetchTheme';
import { GS } from 'login/styles/globalStyles';
import Cluster from 'login/shared/functions/cluster';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

/**
* List of switch for notification intervals on SES.
* 
* @topic Topic user should be subscribed to, or unsubscribed from
* @param {string} topic Topic user should be subscribed to or unsubscribed from
* @param {string} topicTitle Title of the topics the list is for
* @param {boolean} length Whether to include week option or not
* @returns Visual list of switches
*/
export default function topicSwitchList(props) {
    const category = props.category

    return(
        <View>
            {topicSwitch(category + "10m","10 min før", "10 min before")}
            {topicSwitch(category + "30m","30 min før", "30 min before")}
            {topicSwitch(category + "1h","1 time før", "1 hour before")}
            {topicSwitch(category + "2h","2 timer før", "2 hours before")}
            {topicSwitch(category + "3h","3 timer før", "3 hours before")}
            {topicSwitch(category + "6h","6 timer før", "6 hours before")}
            {topicSwitch(category + "1d","1 dag før", "1 day before")}
            {topicSwitch(category + "2d","2 dager før", "2 days before")}
            {props.showLast ? topicSwitch(category + "1w","1 uke før", "1 week before"):null}
        </View>
    )
}

/**
 * Switch for notification intervals on SES.
 * 
 * @topic Topic user should be subscribed to, or unsubscribed from
 * @returns Visual representation of switch as a cluster
 */
function topicSwitch(topic, textNo, textEn) {
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