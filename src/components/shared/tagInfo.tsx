import { Platform, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"
import React from "react"

import { useNavigation } from "@react-navigation/native"

const isIOS = Platform.OS === 'ios'

export default function TagInfo() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { tag } = useSelector((state: ReduxState) => state.event)
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'flex-end', marginBottom: isIOS ? 30 : undefined}}
            onPress={()=>navigation.goBack()}
            activeOpacity={1}>
            <View style={{backgroundColor: theme.dark, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: theme.textColor, marginTop: 5}}>{tag.title}</Text>
                <Text style={{fontSize: 18, color: theme.textColor, margin: 5, marginHorizontal: 12}}>{tag.body}</Text>
            </View>
        </TouchableOpacity>
    )
}
