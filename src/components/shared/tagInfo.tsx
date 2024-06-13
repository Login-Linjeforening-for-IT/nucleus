import { Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

export default function TagInfo() {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { tag } = useSelector((state: ReduxState) => state.event)
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            style={{flex: 1, justifyContent: 'flex-end'}}
            onPress={()=>navigation.goBack()}
            activeOpacity={1}
        >
            <View style={{backgroundColor: theme.dark, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}} testID="TagInfo">
                <Text style={{fontSize: 20, color: theme.textColor, marginTop: 5}}>{tag.title}</Text>
                <Text style={{fontSize: 18, color: theme.textColor, margin: 5, marginHorizontal: 12}}>{tag.body}</Text>
            </View>
            <View style={{height: 20, backgroundColor: theme.dark}} />
        </TouchableOpacity>
    )
}
