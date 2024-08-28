import Cluster, { ClusterSmaller } from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import T from "@styles/text"
import { useEffect, useState } from "react"
import Swipe from "@components/nav/swipe"
import { View, TouchableOpacity, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Text from "@components/shared/text"
import ManageTopics from "@components/notification/manageTopics"
import TopicManager from "@utils/topicManager"

export default function InternalScreen(): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const [displayToken, setDisplayToken] = useState(false)
    const copyText = `(click ${displayToken ? 'token' : 'box'} to copy, or here to ${displayToken ? 'hide' : 'reveal'})`
    const warning = lang 
        ? ['ADVARSEL', 'Med denne tokenen kan HVEM SOM HELST sende EVIG MANGE varslinger til telefonen din.'] 
        : ['WARNING', 'With this token, ANYONE can send an INFINITE AMOUNT of notifications to your phone.']

    return (
        <ScrollView>
            <Swipe left="MenuScreen">
                <View>
                    <View style={{...GS.content, backgroundColor: theme.darker}}>
                        <Space height={Dimensions.get("window").height / 11}/>
                        <ManageTopics />
                        <Space height={Dimensions.get("window").height / 11}/>
                        <Space height={50}/>
                        <TouchableOpacity onPress={() => TopicManager({topic: 'maintenance'})}>
                            <Cluster>
                                <Text style={{...T.centered20, color: theme.textColor}}>
                                    Subscribe to maintenance
                                </Text>
                            </Cluster>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swipe>
        </ScrollView>
    )
}
