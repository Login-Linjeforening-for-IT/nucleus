import { Image, Platform, Text, TouchableOpacity, View } from "react-native"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React from "react"
import { setTag } from "@redux/event"
import { useDispatch } from "react-redux"
import getTags from "@utils/getTags"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "@utils/screenTypes"

type TagsProps = {
    event: DetailedEventData | undefined
}

export default function Tags({event}: TagsProps) {
    if (!event) return null
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const tags = getTags({event, lang})

    return (
        <View style={{flexDirection: "row"}}>
            {tags.map((tag) => <Tag tag={tag} key={tag.title} />)}
        </View>
    )
}

function Tag({tag}: {tag: Tag}) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
    const dispatch = useDispatch()

    return (
        <View style={{left: 12, marginRight: 5, top: Platform.OS === 'ios' ? 4 : 3, marginBottom: 2}}>
            <TouchableOpacity onPress={() => {
                                        navigation.navigate("InfoModal")
                                        dispatch(setTag(tag))}}>
                <View style={{backgroundColor: "#d3b65450", flexDirection: "row", alignSelf: "baseline", padding: 3, borderRadius: 5, paddingHorizontal: 5}}>
                    <Text style={{color: "#d3b654", marginRight: 5}}>{tag.title}</Text>
                    <Image style={GS.tag} source={require("@assets/icons/tag.png")} />
                </View>
            </TouchableOpacity>
        </View>
    )
}