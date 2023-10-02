import { ImageSourcePropType } from "react-native"
import { View, Text, Image } from "react-native"
import Space from "@/components/shared/utils"
import FetchColor from "@styles/fetchTheme"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import T from "@styles/text"
import React from "react"

type ParagraphProps = {
    logo: ImageSourcePropType
    title: string
    body: string
}

export default function Paragraph({ logo, title, body }: ParagraphProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View>
              <View style={GS.row}>
                <Image style={GS.medium} source={logo} />
                <Text style={{
                    ...T.bold28, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {title}
                </Text>
              </View>
              <Text style={{
                    ...T.paragraph, 
                    color: FetchColor({theme, variable: "TEXTCOLOR"})
                }}>
                    {body}
                </Text>
              {Space(25)}
        </View>
    )
}
