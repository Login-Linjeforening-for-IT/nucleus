import { changeNotificationState } from "@redux/notifications"
import topic from "@shared/notificationComponents/topic"
import { useSelector, useDispatch } from "react-redux"
import FetchColor from "@styles/fetchTheme"
import { View, Switch } from "react-native"
import React from "react"

type NotificationProps = {
    category: string
    skip?: boolean
}

/**
 * Function for displaying a notification switch
 *
 * @param {string} category         Category the switch should control
 * @param {string} topicID          Topic the user interacted with
 * @returns                         Notification switch as view
 */
export default function Notification ({category, skip}: NotificationProps) {
     // Fetches states
    const notification = useSelector( (state: ReduxState) => state.notification )
    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { theme } = useSelector( (state: ReduxState) => state.theme )
    const dispatch = useDispatch()

    if (!skip) topic({category: category, lang, catArray: notification[category]})

    const notificationSwitch = (
        <View>
            <Switch
                trackColor={{ true: FetchColor({theme, variable: "TRACKCOLOR"})}}
                thumbColor={notification[category]
                    ? FetchColor({theme, variable: "SWITCHOFFSTATE"})
                    : FetchColor({theme, variable: "SWITCHONSTATE"})
                }
                ios_backgroundColor={
                    FetchColor({theme, variable: "TRACKBACKGROUNDCOLOR"})
                }
                onValueChange={(value) => {
                    dispatch(changeNotificationState({value, category}))
                }}
                value={notification[category]}
            />
        </View>
    )

    return notificationSwitch
}