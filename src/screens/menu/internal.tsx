import Cluster from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import { useSelector } from "react-redux"
import T from "@styles/text"
import Swipe from "@components/nav/swipe"
import { View, TouchableOpacity, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Text from "@components/shared/text"
import ManageTopics from "@components/notification/manageTopics"
import TopicManager from "@utils/notification/topicManager"
import { JSX } from 'react'

export default function InternalScreen(): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <ScrollView>
            <Swipe left="MenuScreen">
                <View>
                    <View style={{ ...GS.content, backgroundColor: theme.darker }}>
                        <Space height={Dimensions.get("window").height / 8} />
                        <ManageTopics />
                        <Space height={Dimensions.get("window").height / 8} />
                        <Space height={50} />
                        <TouchableOpacity onPress={() => TopicManager({ topic: 'maintenance' })}>
                            <Cluster>
                                <Text style={{ ...T.centered20, color: theme.textColor }}>
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
