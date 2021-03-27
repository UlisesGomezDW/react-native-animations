import React, { useRef, useEffect, useState } from 'react'
import { View, Animated, PanResponder, Text } from 'react-native'
import { HEIGHT_SCREEN, WIDTH_SCREEN } from './../util/constants'

const data = [
    { id: 0, color: '#ff6a78', text: '' },
    { id: 1, color: '#6531e6', text: '' },
    { id: 2, color: '#f2b02c', text: '' },
    { id: 3, color: '#f4720b', text: '' },
    { id: 4, color: '#30c5cf', text: '' },
]

function Cards() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const ref = useRef(new Animated.ValueXY()).current

    useEffect(() => {
        console.log(currentIndex)
        ref.setValue({ x: 0, y: 0 })
    }, [currentIndex])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                ref.setValue({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 120) {
                    Animated.spring(ref, {
                        toValue: { x: WIDTH_SCREEN + 100, y: gestureState.dy },
                        useNativeDriver: true,
                    }).start(() => {
                        let counter = currentIndex + 1
                        setCurrentIndex(counter)
                    })
                } else if (gestureState.dx < -120) {
                    Animated.spring(ref, {
                        toValue: { x: WIDTH_SCREEN - 100, y: gestureState.dy },
                        useNativeDriver: true,
                    }).start(() => {
                        let counter = currentIndex + 1
                        setCurrentIndex(counter)
                    })
                } else {
                    Animated.spring(ref, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                        friction: 4,
                    }).start()
                }
            },
        })
    ).current

    const rotate = ref.x.interpolate({
        inputRange: [-WIDTH_SCREEN / 2, 0, WIDTH_SCREEN / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    })

    const nextCardOpacity = ref.x.interpolate({
        inputRange: [-WIDTH_SCREEN / 2, 0, WIDTH_SCREEN / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
    })

    const nextCardScale = ref.x.interpolate({
        inputRange: [-WIDTH_SCREEN / 2, 0, WIDTH_SCREEN / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp',
    })

    const rotateAndTraslate = {
        transform: [
            {
                rotate: rotate,
            },
            ...ref.getTranslateTransform(),
        ],
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 60 }}></View>
            <View style={{ flex: 1 }}>
                {data
                    .map(({ id, color }, i) => {
                        if (i < currentIndex) {
                            return null
                        } else if (i === currentIndex) {
                            return (
                                <Animated.View
                                    {...panResponder.panHandlers}
                                    key={id}
                                    style={[
                                        rotateAndTraslate,
                                        {
                                            height: HEIGHT_SCREEN - 120,
                                            width: WIDTH_SCREEN,
                                            padding: 10,
                                            position: 'absolute',
                                        },
                                    ]}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: color,
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20,
                                        }}
                                    />
                                </Animated.View>
                            )
                        } else {
                            return (
                                <Animated.View
                                    key={id}
                                    style={{
                                        transform: [{ scale: nextCardScale }],
                                        opacity: nextCardOpacity,
                                        height: HEIGHT_SCREEN - 120,
                                        width: WIDTH_SCREEN,
                                        padding: 10,
                                        position: 'absolute',
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: color,
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20,
                                        }}
                                    />
                                </Animated.View>
                            )
                        }
                    })
                    .reverse()}
            </View>
        </View>
    )
}

export default Cards
