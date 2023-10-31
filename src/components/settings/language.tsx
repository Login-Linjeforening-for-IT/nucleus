import { View, Text, TouchableOpacity } from "react-native"
import topic from "@/utils/topic"
import { useSelector, useDispatch } from "react-redux"
import FetchColor from "@styles/fetchTheme"
import SS from "@styles/settingStyles"
import { changeLang } from "@redux/lang"
import React from "react"

/**
 * Choosing language of the application
 * @returns View representing a switch which controls the language of the application
 */
export default function Language() {
    const { lang  } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const dispatch = useDispatch()

    // Sets up notifications to follow language
    topic({topicID: "langChange", lang})

    return (
        <View>
            <TouchableOpacity onPress={() =>  dispatch(changeLang()) }>
                <Text style={{
                    ...SS.langSwitch,
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {lang ? "EN" : "NO"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
