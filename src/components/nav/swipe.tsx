import { useNavigation } from "@react-navigation/native"
import handleSwipe from "@utils/handleSwipe"
import { ReactNode } from "react"
import { Platform, View } from "react-native"
import { 
    GestureHandlerRootView, 
    PanGestureHandler, 
    PanGestureHandlerGestureEvent 
} from "react-native-gesture-handler"

type SwipeProps = {
    children: ReactNode
    left?: string
    right?: string
}

export default function Swipe({children, left, right}: SwipeProps) {
    if (Platform.OS !== "ios") return <View>{children}</View>

    const navigation = useNavigation()

    function handleGesture(event: PanGestureHandlerGestureEvent) {
        handleSwipe({navigation, event, screenLeft: left, screenRight: right})
    }

    return (
        <GestureHandlerRootView>
            <PanGestureHandler onGestureEvent={handleGesture}>
                <View>{children}</View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )
}
