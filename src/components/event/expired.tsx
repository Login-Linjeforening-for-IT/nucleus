import Cluster from "@components/shared/cluster"
import { Text, View } from "react-native"
import ES from "@styles/eventStyles"
import { TextLink } from "@components/shared/link"
import { useSelector } from "react-redux"
import CategorySquare from "@components/shared/category"
import BellIcon from "@components/shared/bellIcon"

type ExpiredProps = {
    id: number | null
    type: "event" | "ad"
}

/**
 * Displays a generic event if the event has expired or is otherwise unavailable
 * when being referred to from another event.
 * 
 * Note: Coded in a modular way for easy support of canceled ads in the future.
 * 
 * @param id Id of the event that has expired or is unavailable
 * @param type event | ad
 * @returns Placeholder event or null
 */
export default function Expired({id, type}: ExpiredProps) {
    if (id && type === "event") return <ExpiredEvent id={id} />
    return null
}

/**
 * Displays a generic event if the event has expired or is otherwise unavailable
 * when being referred to from another event.
 * @param id Id of the event that has expired
 * @returns Generic event
 */
export function ExpiredEvent(id: {id: number}) {
    const {lang} = useSelector((state: ReduxState) => state.lang)
    const {theme} = useSelector((state: ReduxState) => state.theme)
    const content = lang ? "Utilgjengelig" : "This event has expired"
    const retry = lang ? "Klikk her for å prøve likevel" : "Click here to try anyways"

    return (
        <View>
            <Cluster marginVertical={8}>
                <View style={{...ES.eventBack, left: -5}}>
                    <View>
                        <CategorySquare color="333" startDate={id.id} />
                        <Text style={{...ES.eventClusterDayText, color: theme.textColor, top: 10}}>
                        {id.id}
                        </Text>
                    </View>
                    <View style={{...ES.view2, top: 0, width: "85%"}}>
                        <View style={ES.view2}>
                            <View style = {{...ES.title}}>
                                <Text style={{...ES.title, color: theme.textColor}}>
                                    {content}
                                </Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <TextLink 
                                    style={{left: 10.5, top: -10, color: "#fd8738"}} 
                                    text={retry} 
                                    url={`https://login.no/events/${id}`} 
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{...ES.view3, right: 0}}>
                        <View style={ES.bellPosition} >
                            <BellIcon canceled={true} />
                        </View>
                    </View>
                </View>
            </Cluster>
        </View>
    )
}