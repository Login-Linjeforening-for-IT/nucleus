import { Image, View } from "react-native"

type InfoBlockProps = {
    infoText: string
}

export default function InfoBlock({infoText}: InfoBlockProps){
    
    return (
        <View style={{
            backgroundColor: '#0d47a1',
            height: 50,
            width: '100%',
            borderRadius: 5,
            overflow: 'hidden'
        }}>
            <View style={{
                backgroundColor: '#2196f3',
                width: '15%',
                height: '100%'
            }}>
                <Image style={{width: 40, height:40}} source={require('@assets/icons/info-svgrepo-com.png')}></Image>
            </View>
        </View>
    )
}