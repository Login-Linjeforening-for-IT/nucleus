import React, { useRef } from "react";
import { Dimensions, View, Animated, PanResponder } from "react-native";
import { useSelector } from "react-redux";
import CourseContent from "./content";
import { Dispatch, SetStateAction } from "react";

type CourseContentProps = {
    course: Course, 
    clicked: number[],
    setClicked: Dispatch<SetStateAction<number[]>>
}

export default function Swipeable({ course, clicked, setClicked }: CourseContentProps) {
    const { theme } = useSelector((state: ReduxState) => state.theme);
    const width = Dimensions.get('window').width;

    // Step 1: Set up Animated value for tracking horizontal position
    const translateX = useRef(new Animated.Value(0)).current;

    // Step 2: Configure PanResponder to handle gestures
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Start pan responder on horizontal drag
                return Math.abs(gestureState.dx) > 10;
            },
            onPanResponderMove: (_, gestureState) => {
                // Update the animated value with the drag distance
                translateX.setValue(gestureState.dx);
            },
            onPanResponderRelease: (_, gestureState) => {
                // Step 3: Determine if card should be dismissed
                if (gestureState.dx > width * 0.3) {
                    // Animate card off screen
                    Animated.timing(translateX, {
                        toValue: width,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(() => {
                        // Optional: Reset or handle card removal
                        // setClicked([...clicked, someNewValue]);
                        translateX.setValue(0);
                    });
                } else {
                    // Reset card position if not swiped far enough
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <View style={{ padding: 8 }}>
            <View style={{ 
                position: 'absolute',
                width: width * 0.8,
                alignSelf: 'center',
                height: '100%',
                margin: 8,
                top: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
            }} />
            <View style={{ 
                position: 'absolute',
                width: width * 0.85,
                alignSelf: 'center',
                height: '100%',
                margin: 8,
                top: 4,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.contrast,
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 10,
            }} />
            <Animated.View
                style={{
                    transform: [{ translateX }]
                }}
                {...panResponder.panHandlers} // Step 4: Attach panHandlers to Animated.View
            >
                <CourseContent
                    course={course}
                    clicked={clicked}
                    setClicked={setClicked}
                />
            </Animated.View>
        </View>
    );
}
