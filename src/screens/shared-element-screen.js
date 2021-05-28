import React, { useRef } from "react"
import { View, Text, TouchableOpacity, Animated, Easing, ImageBackground } from "react-native"
import Screen from "./../components/layout/screen"
import { SharedElement } from "react-navigation-shared-element"
import { useRoute } from "@react-navigation/native"
import { WIDTH_SCREEN, STATUS_BAR_HEIGHT } from "./../util/constants"
import { StatusBar } from "expo-status-bar"

const Navbar = (props) => {
    const { type, onBack, style } = props
    return (
        <>
            <StatusBar style="light" />
            <View
                style={{
                    flexDirection: "row",
                    height: 50 + STATUS_BAR_HEIGHT,
                    width: "100%",
                    backgroundColor: "#6531e6",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingTop: STATUS_BAR_HEIGHT,
                    ...style,
                }}
            >
                {type === "single" ? (
                    <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: "#FFF" }} onPress={onBack} />
                ) : (
                    <>
                        <View style={{ height: 30, width: 30, backgroundColor: "#FFF" }} />
                        <Text style={{ color: "#FFF", fontSize: 20 }}>APP</Text>
                        <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: "#FFF" }} />
                    </>
                )}
            </View>
        </>
    )
}

const data = [{ label: "Element one", id: "998GSFERTTTyy" }]

export function HomeScreen(props) {
    const { navigation } = props
    const refTranslate = useRef(new Animated.Value(0)).current
    const refRotation = useRef(new Animated.Value(0)).current

    function animation(ref, toValue, duration) {
        return Animated.timing(ref, {
            toValue,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    }

    function initAnimation() {
        animation(refRotation, 1, 500).start((status) => {
            if (status.finished) {
                navigation.navigate("Detail", { param: data[0] })
                setTimeout(() => {
                    refRotation.setValue(0)
                }, 100)
            }
        })
    }

    const rotate = refRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "90deg"],
    })

    return (
        <>
            <Screen
                style={{
                    alignItems: "center",
                    paddingTop: 0,
                    backgroundColor: "red",
                }}
            >
                <Navbar style={{ marginBottom: 30 }} />
                <Text onPress={() => refRotation.setValue(0)} style={{ marginBottom: 50 }}>
                    HOME
                </Text>
                <Animated.View
                    style={{
                        transform: [{ translateY: refTranslate }, { rotate: rotate }],
                    }}
                >
                    <TouchableOpacity activeOpacity={0.8} onPress={initAnimation}>
                        <SharedElement id={`id-element`}>
                            <ImageBackground
                                source={require("./../assets/card.png")}
                                style={{
                                    height: 400,
                                    width: WIDTH_SCREEN - 40,
                                    borderRadius: 30,
                                    overflow: "hidden",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ color: "#FFF" }}>Press</Text>
                            </ImageBackground>
                        </SharedElement>
                    </TouchableOpacity>
                </Animated.View>
            </Screen>
        </>
    )
}

export function DetailScreen(props) {
    const { navigation } = props
    const route = useRoute()

    const { id, label } = route.params.param

    return (
        <>
            <Screen
                style={{
                    alignItems: "center",
                    paddingTop: 0,
                }}
            >
                <Navbar type="single" style={{ marginBottom: 30 }} onBack={() => navigation.goBack()} />
                <SharedElement id={`id-element`}>
                    <ImageBackground
                        source={require("./../assets/card.png")}
                        style={{
                            height: 200,
                            width: WIDTH_SCREEN - 20,
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                            borderRadius: 20,
                        }}
                    >
                        <Text style={{ color: "#FFF" }}>{label}</Text>
                    </ImageBackground>
                </SharedElement>

                <View
                    style={{
                        alignItems: "flex-start",
                        width: "100%",
                        paddingHorizontal: 20,
                        marginTop: 20,
                    }}
                >
                    <Text style={{ fontSize: 22, marginBottom: 10 }}>Text 1</Text>
                    <Text style={{ fontSize: 16 }}>
                        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic
                        or web designs. The passage is attributed to an unknown typesetter in the 15th century who is
                        thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type
                        specimen book.
                    </Text>
                </View>
            </Screen>
        </>
    )
}

DetailScreen.sharedElements = (navigation, otherNavigation, showing) => {
    return [{ id: `id-element`, animation: "fade", resize: "auto" }]
}
