import { Line } from "@components/shared/utils"
import { View, Text, Dimensions } from "react-native"
import { useSelector } from "react-redux"

type SeperatorProps = {
    item: EventProps
    index: number
    eventList: EventProps[]
}

export default function Seperator({item, index, eventList}: SeperatorProps) {
    const {lang} = useSelector((state: ReduxState) => state.lang)
    const {theme} = useSelector((state: ReduxState) => state.theme)

    const previousStart = eventList[index - 1]?.time_start
    const previousTimeDifference = previousStart ? (new Date(previousStart).valueOf() - new Date().valueOf()) / 1000 : 0
    const timeDifference = (new Date(item.time_start).valueOf() - new Date().valueOf()) / 1000
    
    const width = Dimensions.get("window").width / 4
    const options_no = ["Neste uke", "Flere uker til", "Om en måned", "Lenge til"]
    const options_en = ["Next week", "In multiple weeks", "Next month", "In a long time"]
    const options = lang ? options_no : options_en

    // bruk lookup table (uke, måned, senere)
    const timestamps = [604800, 1209600, 24192002, 48384004]

    const index1 = timestamps.findIndex((duration: number) => timeDifference < duration)
    const previousIndex = timestamps.findIndex((duration: number) => previousTimeDifference < duration)
    const content = options[index1]

    
    if (!eventList[index - 1]?.highlight){
        if (index1 === previousIndex) return null
    }
    if (item.highlight) return null
    if (!content) return null

    return (
        <View style={{flexDirection: "row", justifyContent: "center", top: 5}}>
            <Line width={width} height={1} fill={theme.oppositeTextColor} />
            <Text style={{top: -8, color: theme.oppositeTextColor, marginHorizontal: 8}}>
                {content}
            </Text>
            <Line width={width} height={1} fill={theme.oppositeTextColor} />
        </View>
    )
}