import { Line } from "@components/shared/utils"
import { View, Text, Dimensions } from "react-native"
import { useSelector } from "react-redux"

type SeperatorProps = {
    timeDifference: number
}

export default function Seperator({timeDifference}: SeperatorProps) {
    const {lang} = useSelector((state: ReduxState) => state.lang)
    const width = Dimensions.get("window").width / 4
    const options_no = ["Neste uke", "Om en måned", "Neste semester", "Senere"]
    const options_en = ["Next week", "Next month", "Next semester", "Later"]
    const options = lang ? options_no : options_en
    let content = undefined

    // bruk lookup table (uke, måned, senere)
    // const timestamps = {604800, 2419200}

    // if (timeDifference > 604800) {

    // } else if (timeDifference > 2419200) {
        
    // } else {

    // }
    // switch (timeDifference) {
    //     case 604800: content = options[0]; return;
    //     case 2419200: content = options[1]; return;

    // }

    if (!content) return null

    return (
        <View style={{flexDirection: "row", backgroundColor: "red"}}>
            <Line width={width} height={1} />
            <Text>
                {content}
            </Text>
            <Line width={width} height={1} />
        </View>
    )
}