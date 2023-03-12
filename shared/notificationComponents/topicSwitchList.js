import FetchColor from '../../styles/fetchTheme';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import topicSwitch from './topicSwitch';
import Space from '../functions/space';
import { T } from '../../styles/text';

/**
* List of switch for notification intervals on SES.
* 
* @topic Topic user should be subscribed to, or unsubscribed from
* @param {string} topic Topic user should be subscribed to or unsubscribed from
* @param {string} topicTitle Title of the topics the list is for
* @param {boolean} length Whether to include week option or not
* @returns Visual list of switches
*/
export default function topicSwitchList(category, topicTitle, length) {
    const { theme } = useSelector( (state) => state.theme )
  
    return(
        <View>
            {Space(10)}
            <Text style={{...T.text20, left:15, color: FetchColor(theme, 'OPPOSITETEXTCOLOR')}}>{topicTitle}</Text>
            {topicSwitch(category + "10m","10 min før", "10 min before")}
            {topicSwitch(category + "30m","30 min før", "30 min before")}
            {topicSwitch(category + "1h","1 time før", "1 hour before")}
            {topicSwitch(category + "2h","2 timer før", "2 hours before")}
            {topicSwitch(category + "3h","3 timer før", "3 hours before")}
            {topicSwitch(category + "6h","6 timer før", "6 hours before")}
            {topicSwitch(category + "1d","1 dag før", "1 day before")}
            {topicSwitch(category + "2d","2 dager før", "2 days before")}
            {length == 1 ? topicSwitch(category + "1w","1 uke før", "1 week before"):null}
        </View>
    )
  }