import React, { useRef, useEffect, ReactNode } from 'react'
import { View, Animated, StyleSheet, Easing, Dimensions, StyleProp } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from 'react-redux'

type SkeletonProps = {
    children?: ReactNode
    height: number
    loading: boolean
    callback?: Function
    // style: StyleProp<any>
}

const width = Dimensions.get('window').width

export default function Skeleton({ children, height, loading, callback }: SkeletonProps) {
    if (!loading) return children
    
    const { theme } = useSelector((state: ReduxState) => state.theme)
    const lineWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        function animateLine() {
            Animated.loop(
                Animated.timing(lineWidth, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: false
                })
            ).start()
        }

        animateLine();
        console.log('loading')
        return () => {lineWidth.stopAnimation()}
    }, [])

    return (                                                        // move to redux theme
        <View style={{...styles.container, height, backgroundColor: theme.dark}}>
            <Animated.View style={[styles.line,
                    {
                        transform: [{
                            translateX: lineWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-width, width],
                            })
                        }]
                    }
            ]}>
                <LinearGradient
                    colors={[
                        'rgba(117, 117, 117, 0)',
                        'rgba(117, 117, 117, 0.3)',
                        'rgba(117, 117, 117, 0)',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: width / 3, height: '100%' }}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        overflow: 'hidden',
    },
    childrenContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    line: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
    },
})
