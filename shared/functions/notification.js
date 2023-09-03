import { changeNotificationState } from '../../redux/notifications';
import { useSelector, useDispatch } from 'react-redux';
import topic from '../notificationComponents/topic';
import FetchColor from '../../styles/fetchTheme';
import { View, Switch } from 'react-native';

/**
 * Function for displaying a notification switch
 * @param {string} category         Category the switch should control
 * @param {string} topicID          Topic the user should be subscribed to or unsubscribed from
 * @returns                         Notification switch as view
 */
export default function Notification (category, skip) {    //Notification button
    if(category.category) category = category.category
    const notification = useSelector( (state) => state.notification ) // Fetches notification state
    const { lang  } = useSelector( (state) => state.lang  )
    const { theme } = useSelector( (state) => state.theme )
    const dispatch = useDispatch()

    if (!skip) topic(category, lang, notification[category]);

    const notificationSwitch = (
        <View>
            <Switch
                trackColor={{ true: FetchColor(theme, 'TRACKCOLOR') }}
                thumbColor={notification[category] ? FetchColor(theme, 'SWITCHOFFSTATE') : FetchColor(theme, 'SWITCHONSTATE')}
                ios_backgroundColor={FetchColor(theme, 'TRACKBACKGROUNDCOLOR')}
                onValueChange={() => dispatch(changeNotificationState(category))}
                value={notification[category]}
            />
        </View>
    )
    
    return notificationSwitch
}