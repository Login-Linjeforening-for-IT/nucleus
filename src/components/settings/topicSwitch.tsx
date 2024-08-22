import Notification from "@/components/settings/notification"
import Cluster from "@/components/shared/cluster"
import GS from "@styles/globalStyles"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"

type TopicSwitchListProps = {
    category: string
    showLast: boolean
}

type TopicSwitchProps = {
    topic: string
    textNo: string
    textEn: string
}

/**
* List of switch for notification intervals on SES.
*
* @param topic Topic user should be subscribed to or unsubscribed from
* @param topicTitle Title of the topics the list is for
* @param length Whether to include week option or not
* @returns Visual list of switches
*/
export default function TopicSwitchList ({category, showLast}: TopicSwitchListProps): JSX.Element {
    return (
        <View>
            <TopicSwitch topic={category + "10m"} textNo="10 min før" textEn="10 min before" />
            <TopicSwitch topic={category + "30m"} textNo="30 min før" textEn="30 min before" />
            <TopicSwitch topic={category + "1h"} textNo="1 time før" textEn="1 hour before" />
            <TopicSwitch topic={category + "2h"} textNo="2 timer før" textEn="2 hours before" />
            <TopicSwitch topic={category + "3h"} textNo="3 timer før" textEn="3 hours before" />
            <TopicSwitch topic={category + "6h"} textNo="6 timer før" textEn="6 hours before" />
            <TopicSwitch topic={category + "1d"} textNo="1 dag før" textEn="1 day before" />
            <TopicSwitch topic={category + "2d"} textNo="2 dager før" textEn="2 days before" />
            {showLast ? <TopicSwitch topic={category + "1w"} textNo="1 uke før" textEn="1 week before" /> : null}
        </View>
    )
}

/**
 * Switch for notification intervals on SES.
 *
 * @topic Topic user should be subscribed to, or unsubscribed from
 * @returns Visual representation of switch as a cluster
 */
function TopicSwitch ({topic, textNo, textEn}: TopicSwitchProps): JSX.Element {
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <Cluster>
            <View style={GS.notificationBack}>
                <View style={GS.view}>
                    <Text style={{...GS.notificationText, color:
                        theme.oppositeTextColor}}>
                        {lang ? textNo : textEn}
                    </Text>
                </View>
                <View style={GS.view2}>{Notification({category: topic, skip: true})}</View>
            </View>
        </Cluster>
    )
}
