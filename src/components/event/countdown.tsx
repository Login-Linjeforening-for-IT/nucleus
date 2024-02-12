import Card, { CardSmaller } from "@components/shared/card"
import CategorySquare from "@components/shared/category"
import ES from "@styles/eventStyles"
import { View } from "react-native"
import EventTime from "./time"
import { useSelector } from "react-redux"

export default function Countdown() {
    const { event } = useSelector((state: ReduxState) => state.event)

    const startDate = event?.time_start ? new Date(event.time_start) : new Date()
    const endDate = event?.time_type=="default" ? new Date(event.time_end) : undefined

    return (
        <CardSmaller>
            <View style={ES.specificEventInfoView}>
                <Card>
                    <View style={{}}>
                        <CategorySquare color={event.color} startDate={startDate} endDate={endDate}/>
                    </View>
                </Card>
                <EventTime time_start={event.time_start} time_end={event.time_end} />
            </View>
        </CardSmaller>
    )
}