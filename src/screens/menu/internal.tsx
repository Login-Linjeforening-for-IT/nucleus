import Cluster, { ClusterSmaller } from "@/components/shared/cluster"
import Space from "@/components/shared/utils"
import GS from "@styles/globalStyles"
import { useDispatch, useSelector } from "react-redux"
import T from "@styles/text"
import React, { useEffect, useState } from "react"
import Swipe from "@components/nav/swipe"
import { View, TouchableOpacity, Dimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import getFirebaseStatus from "@utils/getFirebaseStatus"
import Text from "@components/shared/text"
import ManageTopics from "@components/notification/manageTopics"
import TopicManager from "@utils/topicManager"
import { changeLoginStatus } from "@redux/loginStatus"
import { useNavigation } from "@react-navigation/native"
import { Navigation } from "@/interfaces"

export default function InternalScreen(): JSX.Element {

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)
    const dispatch = useDispatch()
    const navigation: Navigation = useNavigation()
    const [displayToken, setDisplayToken] = useState(false)
    const copyText = `(click ${displayToken ? 'token' : 'box'} to copy, or here to ${displayToken ? 'hide' : 'reveal'})`
    const [firebase, setFirebase] = useState<Status>({token: 'Pending...', topics: ['Pending', '...'] })
    const warning = lang 
        ? ['ADVARSEL', 'Med denne tokenen kan HVEM SOM HELST sende EVIG MANGE varslinger til telefonen din.'] 
        : ['WARNING', 'With this token, ANYONE can send an INFINITE AMOUNT of notifications to your phone.']

    function handleLogout() {
        dispatch(changeLoginStatus())
        navigation.goBack()
    }

    // Loads initial data
    useEffect(() => {
        // Function to fetch Firebase status
        async function fetchFirebaseStatus() {
            const firebaseStatus: Status = await getFirebaseStatus()
            if (firebaseStatus) {
                setFirebase(firebaseStatus)
            }
        }

        // Fetch initial data
        fetchFirebaseStatus()

        // Setup interval to fetch topics every second
        const intervalId = setInterval(fetchFirebaseStatus, 1000)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId)
    }, [])

    return (
        <ScrollView>
            <Swipe left="MenuScreen">
                <View>
                    <View style={{...GS.content, backgroundColor: theme.darker}}>
                        <Space height={Dimensions.get("window").height / 11}/>
                        <ManageTopics />
                        <Space height={Dimensions.get("window").height / 11}/>
                        <Text style={{...T.centered15, color: theme.textColor}}>
                            Subscribed topics
                        </Text>
                        <ClusterSmaller>
                            <Text style={{...T.centered15, color: theme.oppositeTextColor}} copyable={true}>
                                {firebase.topics}
                            </Text>
                        </ClusterSmaller>
                        <Space height={50}/>
                        <TouchableOpacity onPress={() => TopicManager({topic: 'maintenance'})}>
                            <Cluster>
                                <Text style={{...T.centered20, color: theme.textColor}}>
                                    Subscribe to maintenance
                                </Text>
                            </Cluster>
                        </TouchableOpacity>
                        <Space height={50}/>
                        <Text style={{...T.centered15, color: theme.oppositeTextColor}}>
                            Device token
                        </Text>
                        <Space height={5}/>
                        <ClusterSmaller>
                            <Text style={{
                                ...T.centered10, 
                                color: displayToken ? theme.oppositeTextColor : theme.dark, 
                                backgroundColor: displayToken ? undefined : theme.dark
                            }} copyable={true} warning={warning}>
                                {firebase.token}
                            </Text>
                        </ClusterSmaller>
                        <Space height={5}/>
                        <TouchableOpacity onPress={() => setDisplayToken(!displayToken)}>
                            <Text style={{...T.centered10, color: theme.oppositeTextColor}}>
                                {copyText}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLogout()}>
                            <Text style={{...T.centered10, top: 85, padding: 15, color: theme.oppositeTextColor}}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swipe>
        </ScrollView>
    )
}
