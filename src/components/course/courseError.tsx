import { Text, View } from "react-native"
import { useSelector } from "react-redux"

export default function CourseError({text}: {text: string}) {
    const { theme } = useSelector((state: ReduxState) => state.theme)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, color: theme.textColor }}>{text}</Text>
        </View>
    )
}