import { Image, Text, TouchableOpacity, View } from "react-native"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React from "react"
import { setTag } from "@redux/event"
import { useDispatch } from "react-redux"

type TagProps = {
    text: string
}

export default function Tags() {
    
    return (
        <View style={{flexDirection: "row"}}>
            <Tag text="P&P" />
            <Tag text="Cancelled" />
        </View>
    )
}

function Tag({text}: TagProps) {
    const { tag } = useSelector((state: ReduxState) => state.event)
    const dispatch = useDispatch()

    return (
        <View style={{marginRight: 5}}>
            <TouchableOpacity onPress={() => dispatch(setTag(tag ? '' : text))}>
                <View style={{backgroundColor: "#d3b65450", flexDirection: "row", alignSelf: "baseline", padding: 3, borderRadius: 5, paddingHorizontal: 5, left: 12, bottom: 6}}>
                    <Text style={{color: "#d3b654", marginRight: 5}}>{text}</Text>
                    <Image style={GS.tag} source={require("@assets/icons/tag.png")} />
                </View>
            </TouchableOpacity>
        </View>
    )
}