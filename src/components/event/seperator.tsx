import { Line } from "@components/shared/utils"
import { View, Text, Dimensions } from "react-native"
import { useSelector } from "react-redux"

type SeperatorProps = {
    item: EventProps
    usedIndexes: number[]
}

export default function Seperator({item, usedIndexes}: SeperatorProps) {
    if (item.highlight) return null

    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)

    const timeDifference = (new Date(item.time_start).valueOf() - new Date().valueOf()) / 1000
    const options_no = ["Neste uke", "Flere uker til", "Om en måned", "Lenge til"]
    const options_en = ["Next week", "In multiple weeks", "Next month", "In a long time"]
    const options = lang ? options_no : options_en
    const timestamps = [604800, 1209600, 24192002, 48384004]
    const index = timestamps.findIndex((duration: number) => timeDifference < duration)

    if (usedIndexes.includes(index)) return null
    else usedIndexes.push(index)

    const content = options[index]
    if (!content) return null

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