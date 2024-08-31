import { Dispatch, SetStateAction, useState } from 'react'
import { View, Dimensions } from 'react-native'
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
import CourseContent from './content'
import ReadOnly from './readonly'

type CourseContentProps = {
    course: Course, 
    clicked: number[],
    setClicked: Dispatch<SetStateAction<number[]>>
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25

export default function Swiper({ course, clicked, setClicked }: CourseContentProps) {
    if (course.mark) return <ReadOnly text={course.textUnreviewed.join('\n')} />

    const { theme } = useSelector((state: ReduxState) => state.theme)
    const [currentIndex, setCurrentIndex] = useState(0)
    const translateX = useSharedValue(0)  
    const [cardID, setCardID] = useState<number>(0)
    const next = cardID + 1
    const previous = cardID - 1
    
    function handlePrevious() {
        setClicked([])
        setCardID(previous >= 0 ? previous : cardID)
    }

    function handleNext() {
        // check question logic and reveal answer
        setClicked([])
        setCardID(next < course.cards.length ? next : cardID)
    }

    // Function to calculate next index
    function getNextIndex(currentIndex: number) {
        if (currentIndex < course.cards.length - 1) {
            return currentIndex + 1
        }

        return currentIndex
    }
    
    // Function to calculate previous index in a circular manner
    function getPreviousIndex(currentIndex: number) {
        if (currentIndex > 0) {
            return currentIndex - 1
        }

        return 0
    }
    
    function onSwipeRight() {
        setCurrentIndex(getNextIndex(currentIndex))
        handleNext()
    }

    function onSwipeLeft() {
        setCurrentIndex(getPreviousIndex(currentIndex))
        handlePrevious()
    }

    function resetTranslateX() {
        setTimeout(() => {
            translateX.value = 0;
        }, 400);
    };

    function resetTranslateX200ms() {
        setTimeout(() => {
            translateX.value = 0;
        }, 200);
    };

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value
        },
        onActive: (event, context) => {
            // @ts-expect-error
            translateX.value = context.startX + event.translationX
        },
        onEnd: (event) => {
            if (event.translationX > SWIPE_THRESHOLD) {
                runOnJS(onSwipeRight)()
                translateX.value = withSpring(SCREEN_WIDTH * 1.2)
                runOnJS(resetTranslateX)();
            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-SCREEN_WIDTH - 10, {}, () => {
                    runOnJS(onSwipeLeft)()
                })
                runOnJS(resetTranslateX200ms)();
            } else {
                // No significant swipe, reset position
                translateX.value = withSpring(0)
            }
        },
    })
  
    // Animated styles for the top card (current card)
    const animatedStyle = useAnimatedStyle(() => {
        if (translateX.value < 0) {
            const translateY = interpolate(
                translateX.value,
                [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                [10, 0, 10],
            )

            const width = interpolate(
                translateX.value,
                [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                [SCREEN_WIDTH * 0.9, SCREEN_WIDTH * 0.95, SCREEN_WIDTH * 0.9],
            )

            return {
                width,
                transform: [{ translateY }],
            }
        }
        
        const rotate = `${(translateX.value / SCREEN_WIDTH) * 15}deg`
  
        return {
            width: SCREEN_WIDTH * 0.95,
            transform: [
                { translateX: translateX.value },
                { rotate: rotate },
            ],
        }
    })
  
    // Animated styles for the second card in the stack
    const animatedSecondCardStyle = useAnimatedStyle(() => {
        if (translateX.value < 0) {
            const translateY = interpolate(
                translateX.value,
                [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                [10, 0, 10],
            )

            const width = interpolate(
                translateX.value,
                [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                [SCREEN_WIDTH * 0.85, SCREEN_WIDTH * 0.9, SCREEN_WIDTH * 0.85],
            )

            return {
                width,
                transform: [{ translateY }],
            }
        }

        const translateY = interpolate(
            translateX.value,
            [SCREEN_HEIGHT * 0.45, 0, SCREEN_HEIGHT * 0.45],
            [-3.5, 0, -3.5],
        )

        const width = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [SCREEN_WIDTH * 0.94, SCREEN_WIDTH * 0.9, SCREEN_WIDTH * 0.94],
        )

        return {
            width,
            height: SCREEN_HEIGHT * (SCREEN_HEIGHT === 592 ? 0.72 
                : SCREEN_HEIGHT >= 592 && SCREEN_HEIGHT < 700 ? 0.76 
                : SCREEN_HEIGHT > 800 && SCREEN_HEIGHT <= 900 ? 0.8 
                : SCREEN_HEIGHT > 900 ? 0.77 : 0.75),
            transform: [{ translateY }],
        }
    })

    // Animated styles for the third card
    const animatedThirdCardStyle = useAnimatedStyle(() => {
        if (translateX.value < 0) {
            const translateY = interpolate(
                translateX.value,
                [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                [10, 0, 10],
            )

            const width = interpolate(
                translateX.value,
                [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
                [SCREEN_WIDTH * 0.8, SCREEN_WIDTH * 0.85, SCREEN_WIDTH * 0.8],
            )

            return {
                width,
                transform: [{ translateY }],
            }
        }

        const translateY = interpolate(
            translateX.value,
            [SCREEN_HEIGHT * 0.45, 0, SCREEN_HEIGHT * 0.45],
            [-3.5, 0, -3.5],
        )

        const width = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [SCREEN_WIDTH * 0.9, SCREEN_WIDTH * 0.85, SCREEN_WIDTH * 0.9],
        )

        return {
            width,
            height: SCREEN_HEIGHT * (SCREEN_HEIGHT === 592 ? 0.72 
                : SCREEN_HEIGHT >= 592 && SCREEN_HEIGHT < 700 ? 0.76 
                : SCREEN_HEIGHT > 800 && SCREEN_HEIGHT <= 900 ? 0.8 
                : SCREEN_HEIGHT > 900 ? 0.77 : 0.75),
            transform: [{ translateY }],
        }
    })

    // Animated styles for the fourth card
    const animatedFourthCardStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [-3.5, 0, -3.5],
        )

        const width = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [SCREEN_WIDTH * 0.85, SCREEN_WIDTH * 0.8, SCREEN_WIDTH * 0.85],
        )

        return {
            width,
            height: SCREEN_HEIGHT * (SCREEN_HEIGHT === 592 ? 0.72 
                : SCREEN_HEIGHT >= 592 && SCREEN_HEIGHT < 700 ? 0.76 
                : SCREEN_HEIGHT > 800 && SCREEN_HEIGHT <= 900 ? 0.8 
                : SCREEN_HEIGHT > 900 ? 0.77 : 0.75),
            transform: [{ translateY }],
        }
    })

    const animatedHiddenCardStyle = useAnimatedStyle(() => {
        if (translateX.value > 0) {
            return {}
        }

        const left = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [0, SCREEN_WIDTH * 1.2, 0],
        )

        const rotation = interpolate(
            translateX.value,
            [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            [0, 15, 0],
        )

        return {
            width: SCREEN_WIDTH * 0.85,
            left,
            transform: [{ rotate: `${rotation + 0.5}deg` }],
        }
    })
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', marginBottom: 10, paddingBottom: 10 }}>
            {/* Fifth card */}
            <Animated.View style={[{
                position: 'absolute',
                width: SCREEN_WIDTH * 0.75,
                height: SCREEN_HEIGHT * (SCREEN_HEIGHT === 592 ? 0.72 
                    : SCREEN_HEIGHT >= 592 && SCREEN_HEIGHT < 700 ? 0.76 
                    : SCREEN_HEIGHT > 800 && SCREEN_HEIGHT <= 900 ? 0.8 
                    : SCREEN_HEIGHT > 900 ? 0.77 : 0.75),
                top: 16,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            }]} />
            
            {/* Forth card */}
            <Animated.View style={[{
                position: 'absolute',
                top: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            }, animatedFourthCardStyle]} />

            {/* Third card */}
            <Animated.View style={[{
                position: 'absolute',
                top: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            }, animatedThirdCardStyle]} />

            {/* Second card (next card) */}
            <Animated.View style={[{
                position: 'absolute',
                top: 4,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            }, animatedSecondCardStyle]}>
                <CourseContent
                    course={course}
                    clicked={clicked}
                    setClicked={setClicked}
                    cardID={cardID}
                    setCardID={setCardID}
                    previous={previous}
                    next={next}
                />
            </Animated.View>

            {/* Top card (current card) */}
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={[{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.contrast,
                    borderRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 10,
                    height: SCREEN_HEIGHT * (SCREEN_HEIGHT === 592 ? 0.72 
                        : SCREEN_HEIGHT >= 592 && SCREEN_HEIGHT < 700 ? 0.76 
                        : SCREEN_HEIGHT > 800 && SCREEN_HEIGHT <= 900 ? 0.8 
                        : SCREEN_HEIGHT > 900 ? 0.77 : 0.75),
                }, animatedStyle]}>
                    <CourseContent
                        course={course}
                        clicked={clicked}
                        setClicked={setClicked}
                        cardID={cardID}
                        setCardID={setCardID}
                        previous={previous}
                        next={next}
                    />
                </Animated.View>
            </PanGestureHandler>

            {/* Previous (hidden) card */}
            {cardID !== 0 && <Animated.View style={[{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                height: SCREEN_HEIGHT * (SCREEN_HEIGHT === 592 ? 0.72 
                    : SCREEN_HEIGHT >= 592 && SCREEN_HEIGHT < 700 ? 0.76 
                    : SCREEN_HEIGHT > 800 && SCREEN_HEIGHT <= 900 ? 0.8 
                    : SCREEN_HEIGHT > 900 ? 0.77 : 0.75),
                width: SCREEN_WIDTH * 0.95,
            }, animatedHiddenCardStyle]} >
                <CourseContent
                    course={course}
                    clicked={clicked}
                    setClicked={setClicked}
                    cardID={cardID}
                    setCardID={setCardID}
                    previous={previous}
                    next={next}
                />
            </Animated.View>}
        </View>
    )
}
