import React, { useState, useRef } from "react"
import { Text, View, Animated, StyleSheet, TouchableOpacity, Easing } from "react-native"
import Screen from "./../components/layout/screen"
import { StatusBar } from "expo-status-bar"

const CIRCLE_SIZE = 100

function Circle({ onPress, animatedValue }) {
    const inputRange = [0, 0.001, 0.5, 0.501, 1]

    const containerColor = animatedValue.interpolate({
        inputRange,
        outputRange: ["gold", "gold", "gold", "#444", "#444"],
    })

    const circleColor = animatedValue.interpolate({
        inputRange,
        outputRange: ["#444", "#444", "#444", "gold", "gold"],
    })

    return (
        <>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        paddingBottom: 20,
                        backgroundColor: "gold",
                    },
                    {
                        backgroundColor: containerColor,
                    },
                ]}
            >
                <Animated.View
                    style={[
                        {
                            width: CIRCLE_SIZE,
                            height: CIRCLE_SIZE,
                            borderRadius: CIRCLE_SIZE / 2,
                            backgroundColor: circleColor,
                            overflow: "hidden",
                        },
                        {
                            transform: [
                                {
                                    perspective: 100,
                                },
                                {
                                    rotateY: animatedValue.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: ["0deg", "-90deg", "-180deg"],
                                    }),
                                },
                                {
                                    scale: animatedValue.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: [1, 8, 1],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity
                        activeOpacity={0}
                        onPress={onPress}
                        style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    />
                </Animated.View>
            </Animated.View>
        </>
    )
}

function ScaleScreen() {
    const [index, setIndex] = useState(0)
    const animatedValue = useRef(new Animated.Value(0)).current

    const animation = (toValue) =>
        Animated.timing(animatedValue, {
            toValue,
            duration: 800,
            //easing: Easing.circle,
            useNativeDriver: false,
        })

    function onPress() {
        setIndex(index === 1 ? 0 : 1)
        animation(index === 1 ? 0 : 1).start()
    }

    return (
        <>
            <Screen
                style={{
                    justifyContent: "flex-start",
                }}
            >
                <StatusBar />
                <Circle onPress={onPress} animatedValue={animatedValue} />
            </Screen>
        </>
    )
}

/*

Platform.OS === "ios"
                                    ? {
                                          translateX: animatedValue.interpolate({
                                              inputRange: [0, 0.5, 1],
                                              outputRange: ["0%", "50%", "0%"],
                                          }),
                                      }
                                    : null,
 

 */

export default ScaleScreen
