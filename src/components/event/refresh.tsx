import { Image, View } from "react-native";

type RefreshProps = {
    display: boolean
}

export default function Refresh({display}: RefreshProps) {
    if (!display) return <></>

    return (
        <View style={{height: 50, width: 50, marginVertical: 20, alignSelf: "center"}}>
            <Image style={{height: 50, width: 50}} source={require("@assets/icons/refresh.gif")} />
        </View>
    )
}