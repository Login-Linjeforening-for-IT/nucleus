import { Line } from "@components/shared/utils"
import { View, Text, Dimensions } from "react-native"
import { useSelector } from "react-redux"

type SeperatorProps = {
    timeDifference: number
    previousTimeDifference: number
}

export default function Seperator({timeDifference, previousTimeDifference}: SeperatorProps) {
    const {lang} = useSelector((state: ReduxState) => state.lang)
    const {theme} = useSelector((state: ReduxState) => state.theme)
    const width = Dimensions.get("window").width / 4
    const options_no = ["Neste uke", "Flere uker til", "Om en måned", "Lenge til"]
    const options_en = ["Next week", "In multiple weeks", "Next month", "In a long time"]
    const options = lang ? options_no : options_en

    // bruk lookup table (uke, måned, senere)
    const timestamps = [604800, 1209600, 24192002, 48384004]

    const index = timestamps.findIndex((duration: number) => timeDifference < duration)
    const previousIndex = timestamps.findIndex((duration: number) => previousTimeDifference < duration)
    const content = options[index]

    if (index === previousIndex) return null
    if (!content) return null

    return (
        <View style={{justifyContent: "center", top: -5, left: 3}}>
            <Text style={{color: theme.oppositeTextColor, backgroundColor: theme.darker, alignSelf: "center", paddingHorizontal: 8, top: 2, zIndex: 1}}>
                {content}
            </Text>
            <View style={{top: -5,}}>
                <Line width={Dimensions.get("window").width * 0.92} height={1} fill={theme.oppositeTextColor} />
            </View>
        </View>
    )
}   