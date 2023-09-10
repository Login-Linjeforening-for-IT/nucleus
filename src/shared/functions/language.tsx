import { View, Text, TouchableOpacity } from "react-native"
import topic from "@shared/notificationComponents/topic"
import { useSelector, useDispatch } from "react-redux"
import FetchColor from "@styles/fetchTheme"
import { SS } from "@styles/settingStyles"
import { changeLang } from "@redux/lang"
import React from "react"

/**
 * Function for choosing the language
 * @returns View representing a switch which controls the language of the application
 */
export default function Language() {    //Choose the language
    const { lang  } = useSelector((state: ReduxState) => state.lang  )
    const { theme } = useSelector((state: ReduxState) => state.theme )
    const dispatch = useDispatch()

    topic({topicID: "langChange", lang})  // Sets up notifications to follow language

    return(
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