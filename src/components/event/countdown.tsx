import Card, { CardSmaller } from "@components/shared/card"
import CategorySquare from "@components/shared/category"
import { Month } from "@components/shared/utils"
import ES from "@styles/eventStyles"
import { Text, View } from "react-native"
import EventTime from "./time"
import { useSelector } from "react-redux"

export default function Countdown() {
    const { event } = useSelector((state: ReduxState) => state.event)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <CardSmaller>
            <View style={ES.specificEventInfoView}>
                <Card>
                    <View style={{left: -10}}>
                    <CategorySquare color={event.category_color} />
                    <Text style={{
                        ...ES.eventClusterDayText, 
                        color: theme.textColor
                    }}>
                        {event.time_start[8]}
                        {event.time_start[9]}
                    </Text>

                    <Text style={{
                        ...ES.monthText, 
                        color: theme.textColor
                    }}>
                    <Month
                        month={parseInt(event.time_start[5] + event.time_start[6])}
                        color={theme.textColor}
                    />
                    </Text>
                    </View>
                </Card>
                <EventTime
                    time_start={event.time_start}
                    time_end={event.time_end} 
                />
            </View>
        </CardSmaller>
    )
}