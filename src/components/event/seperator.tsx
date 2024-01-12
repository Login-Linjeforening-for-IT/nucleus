import { Line } from "@components/shared/utils"
import { View, Text, Dimensions } from "react-native"
import { useSelector } from "react-redux"

type SeperatorProps = {
    item: EventProps
    index: number
}

export default function Seperator({item, index}: SeperatorProps) {
    if (item.highlight) return null

    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { events } = useSelector((state: ReduxState) => state.event)

    const previousStart = events[index - 1]?.time_start
    const previousTimeDifference = previousStart ? (new Date(previousStart).valueOf() - new Date().valueOf()) / 1000 : 0
    const timeDifference = (new Date(item.time_start).valueOf() - new Date().valueOf()) / 1000
    const options_no = ["Neste uke", "Flere uker til", "Om en måned", "Lenge til"]
    const options_en = ["Next week", "In multiple weeks", "Next month", "In a long time"]
    const options = lang ? options_no : options_en
    const timestamps = [604800, 1209600, 24192002, 48384004]
    const index1 = timestamps.findIndex((duration: number) => timeDifference < duration)
    const previousIndex = timestamps.findIndex((duration: number) => previousTimeDifference < duration)
    const content = options[index1]

    if (!content) return null
    if (!events[index - 1]?.highlight){
        if (index1 === previousIndex) return null
    }

    return (
        <View style={{justifyContent: "center", top: -5, left: 5}}>
            <Text style={{color: theme.oppositeTextColor, backgroundColor: theme.darker, alignSelf: "center", paddingHorizontal: 8, top: 3, zIndex: 1}}>
                {content}
            </Text>
            <View style={{top: -5}}>
                <Line width={Dimensions.get("window").width * 0.945} height={1} fill={theme.oppositeTextColor} />
            </View>
        </View>
    )
}   