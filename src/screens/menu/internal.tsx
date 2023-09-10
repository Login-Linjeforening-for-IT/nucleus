import topic from "@shared/notificationComponents/topic"
import FetchColor from "@styles/fetchTheme"
import Space from "@shared/components/utils"
import Card from "@shared/functions/card"
import { GS } from "@styles/globalStyles"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import { ScreenProps } from "@interfaces"
import TopMenu from "@shared/topMenu"
import { T } from "@styles/text"
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native"

export default function InternalScreen({ navigation }: ScreenProps): JSX.Element {

    const { lang  } = useSelector( (state: ReduxState) => state.lang  )
    const { login } = useSelector( (state: ReduxState) => state.login )
    const { theme } = useSelector( (state: ReduxState) => state.theme )

    const setting = [
        {id: 0, nav: "TodoScreen", arg: 1, titleEN: "Todo"},
        {id: 1, nav: "MakeNotificationScreen", arg: 0, titleEN: "Send notification"},
    ]


  return(
    <View>
        <View style={{...GS.content, backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
            <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={1}
            keyExtractor={(item) => `${item.id}`}
            data={setting}
            renderItem={({item, index}) => (
                <View>
                    {index === 0 ? Space(Dimensions.get("window").height/8): null}
                    <TouchableOpacity onPress={() => topic({topicID: 
                        "maintenance", lang: index === 1 ? true : undefined})}>
                        <Card>
                            <Text style={{...T.centered20, color: FetchColor({theme, variable: "TEXTCOLOR"})}}>
                                {"Maintenance " + item.arg}
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </View>
            )}
            />
            {Space(Dimensions.get("window").height/3)}
        </View>
        <TopMenu 
            navigation={navigation}
            screen="internal"
            title={lang ? "Internt" : "Intranet"}
            back={"MenuScreen"} 
        />
    </View>
  )
}