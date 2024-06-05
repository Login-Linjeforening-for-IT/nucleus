import { Navigation } from "@interfaces"
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler"

type HandleSwipeProps = {
    navigation: Navigation
    event: PanGestureHandlerGestureEvent
    screenLeft?: string
    screenRight?: string
    id?: number
}

/**
 * Handles horizontal swipes on all screens, and navigates to the corresponding
 * screen if any exist.
 * 
 * @param navigation Navigation object 
 * @param event Gesture event from the gesture handler 
 * @param screenLeft The screen to the left of where you are (if any)
 * @param screenRight The screen to the right of where you are (if any)
 */
export default function handleSwipe({navigation, event, screenLeft, screenRight, id}: 
HandleSwipeProps): void {
    const { velocityX, velocityY } = event.nativeEvent

    if (Math.abs(velocityX) > Math.abs(velocityY)) {
        if (velocityX > 600 && screenLeft) {
            // Navigates to the screen to the left (root is always left)
            navigation.navigate(screenLeft)
        }

        if (velocityX < -600 && screenRight) {
            // Navigates to the screen to the right
            navigation.navigate(screenRight)
        }
    }
}
