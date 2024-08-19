import { useState } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
    interpolate,
} from 'react-native-reanimated'
import { useSelector } from 'react-redux'

type GameListContentProps = {
    game: Question[] | NeverHaveIEver[] | OkRedFlagDealBreaker[]
}

type GameContentProps = {
    game: Question | NeverHaveIEver | OkRedFlagDealBreaker
}

type CardProps = {
    card: Question | NeverHaveIEver | OkRedFlagDealBreaker, 
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25

export default function Swiper({ game }: GameListContentProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const [currentIndex, setCurrentIndex] = useState(0)
    const translateX = useSharedValue(0)
    const [nextIndex, setNextIndex] = useState(1)
  
    function onSwipeRight() {
        if (currentIndex < game.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    function onSwipeLeft() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }
  
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value
        },
        onActive: (event, context: any) => {
            translateX.value = context.startX + event.translationX
        },
        onEnd: (event) => {
            if (event.translationX > SWIPE_THRESHOLD) {
                translateX.value = withSpring(SCREEN_WIDTH, {}, () => {
                    runOnJS(onSwipeRight)()
                })
                translateX.value = 0
            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-SCREEN_WIDTH, {}, () => {
                    runOnJS(onSwipeLeft)()
                })
                translateX.value = 0
            } else {
                translateX.value = withSpring(0)
            }
        },
    })
  
    // Animated styles for the top card (current card)
    const animatedStyle = useAnimatedStyle(() => {
        const rotate = `${(translateX.value / SCREEN_WIDTH) * 15}deg`
  
        return {
            transform: [
                { translateX: translateX.value },
                { rotate: rotate },
            ],
        }
    })
  
    // Animated styles for the second card in the stack
    const animatedSecondCardStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [1, 0, 1]
        )

        const translateY = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [10, 0, 10]
        )
  
        return {
            transform: [
                { scale: scale },
                { translateY: translateY },
            ],
        }
    })
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* Second card (next card) */}
            <Animated.View style={[{
                position: 'absolute',
                width: SCREEN_WIDTH * 0.85,
                height: '100%',
                top: SCREEN_HEIGHT * 0.16 + 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 10,
            }, animatedSecondCardStyle]}>
                <GameContent game={game[nextIndex]} />
            </Animated.View>
    
            {/* Top card (current card) */}
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[{
                    width: SCREEN_WIDTH * 0.85,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.contrast,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 10,
                    height: SCREEN_HEIGHT * 0.45,
                    top: SCREEN_HEIGHT * 0.16,
                }, animatedStyle]}>
                    <Text style={{position: 'absolute', bottom: 15, left: 15, fontSize: 20, color: theme.orange, fontWeight: '600'}}>{currentIndex + 1}</Text>
                    <GameContent game={game[currentIndex]} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
  }

function GameContent({game}: GameContentProps) {

    return (
        <View style={{
            borderRadius: 20, 
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <InnerContent card={game} />
        </View>
    )
}

// Text inside of the com
function InnerContent({card}: CardProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const { lang } = useSelector((state: ReduxState) => state.lang)

    return (
        <>
            <View>
                <Text style={{color: theme.textColor, fontSize: 24}}>
                    {lang ? card.title_no : card.title_en}
                </Text>
            </View>
        </>
    )
}