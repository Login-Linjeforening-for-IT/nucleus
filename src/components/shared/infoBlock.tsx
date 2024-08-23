import { Text, View } from "react-native"
import { SvgXml } from "react-native-svg"
import { useSelector } from "react-redux"
import infoSvg from "@assets/icons/info.svg"

type InfoBlockProps = {
    text: string
    eventRelated?: boolean
}

type InfoProps = {
    text: string
}

export default function InfoBlock({text, eventRelated}: InfoBlockProps){
    if (eventRelated) return <Info text={text} />

    return (
        <View style={{
            backgroundColor: '#003946',
            minHeight: 50,
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View style={{
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <SvgXml xml={infoSvg} color="#62c4d7" />
            </View>
            <Text style={{color: "#ffffff", fontSize: 16, paddingVertical: 10, width: '80%'}}>
                {text}
            </Text>
        </View>
    )
}

function Info({text}: InfoProps) {
    const { event } = useSelector((state: ReduxState) => state.event)
    
    if (!event?.event) return null

    return (
        <View style={{
            backgroundColor: event.event.canceled ? '#800000B3' : '#003946',
            minHeight: 50,
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <View style={{
                width: '15%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <SvgXml 
                    xml={infoSvg} 
                    color={event.event.canceled ? "#ff4040" : "#62c4d7"} 
                />
            </View>
            <Text style={{
                color: "#ffffff", 
                fontSize: 20, 
                paddingVertical: 10, 
                width: '80%'
            }}>
                {text}
            </Text>
        </View>
    )
}