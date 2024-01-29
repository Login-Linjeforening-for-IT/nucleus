import { Text, TouchableOpacity, View } from "react-native"
import no from "@text/tag/no.json"
import en from "@text/tag/en.json"
import { useSelector } from "react-redux"
import React from "react"

import { useNavigation } from "@react-navigation/native"


function getInfo(tag: string, lang: boolean) {
    const TagInfo = lang ? no : en
    const keys = Object.keys(TagInfo)
    const values = Object.values(TagInfo)
    const index = keys.indexOf(tag)
    return values[index]
}

export default function TagInfo() {
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { tag } = useSelector((state: ReduxState) => state.event)
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'flex-end'}}
            onPress={()=>navigation.goBack()}
            activeOpacity={1}>
            <View style={{backgroundColor: theme.dark, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: theme.textColor, marginTop: 5}}>{tag}</Text>
                <Text style={{fontSize: 18, color: theme.textColor, margin: 5, marginHorizontal: 12}}>{getInfo(tag, lang)}</Text>
            </View>
        </TouchableOpacity>
    )
}
