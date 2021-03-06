import React, { useState, useRef, useEffect } from "react"
import { View, Modal, TouchableWithoutFeedback, Animated, Easing, ScrollView, Platform, StyleSheet } from "react-native"
import { WIDTH_SCREEN, HEIGHT_SCREEN } from "./../../util/constants"
import { BlurView } from "expo-blur"

function CoverBackground(props) {
    const { children, platform } = props

    return (
        <>
            {platform === "ios" ? (
                <BlurView
                    intensity={100}
                    style={[StyleSheet.absoluteFill, { width: WIDTH_SCREEN, height: HEIGHT_SCREEN }]}
                >
                    {children}
                </BlurView>
            ) : (
                <BlurView
                    tint="dark"
                    intensity={100}
                    style={[StyleSheet.absoluteFill, { width: WIDTH_SCREEN, height: HEIGHT_SCREEN }]}
                >
                    {children}
                </BlurView>
            )}
        </>
    )
}

function ActionSheet(props) {
    const { style, children, onClose = () => null, visible } = props

    const [show, setShow] = useState(visible)

    const HEIGHT = style && style.height ? style.height : 200
    const PARTITION = HEIGHT / 4

    const animationRef = useRef(new Animated.Value(0)).current
    const scrollRef = useRef(null)

    const duration = 300

    useEffect(() => {
        visible ? openActionSheet() : closeActionSheet()
    }, [visible])

    function openActionSheet() {
        setShow(true)
        animation(1)
    }

    function closeActionSheet() {
        animation(0)
        setTimeout(() => {
            setShow(false)
        }, duration + 50)
    }

    function animation(toValue) {
        Animated.timing(animationRef, {
            toValue,
            duration,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start()
    }

    const translate = animationRef.interpolate({
        inputRange: [0, 1],
        outputRange: [HEIGHT, 1],
        extrapolate: "clamp",
    })

    function handleScroll(e) {
        const offsetTotal = HEIGHT - PARTITION
        const offsetPartition = offsetTotal / 5
        const offsetY = e.nativeEvent.contentOffset.y

        if (offsetY <= offsetPartition) {
            onClose()
        } else {
            scrollRef.current.scrollTo({ y: offsetTotal, animated: true })
        }
    }

    return (
        <>
            <Modal statusBarTranslucent={true} visible={show} transparent>
                <CoverBackground platform={Platform.OS}>
                    <ScrollView
                        ref={scrollRef}
                        onLayout={() => {
                            scrollRef.current.scrollToEnd({ animated: true })
                        }}
                        scrollEventThrottle={16}
                        onScrollEndDrag={handleScroll}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                            width: WIDTH_SCREEN,
                        }}
                    >
                        <TouchableWithoutFeedback onPress={onClose}>
                            <View
                                //onTouchMove={onClose}
                                style={{
                                    height: HEIGHT_SCREEN - PARTITION,
                                    width: "100%",
                                    backgroundColor: "transparent",
                                }}
                            />
                        </TouchableWithoutFeedback>

                        <Animated.View
                            style={{
                                width: "100%",
                                height: HEIGHT,
                                backgroundColor: "#FFF",
                                borderTopRightRadius: 20,
                                borderWidth: 0,
                                borderTopLeftRadius: 20,
                                transform: [{ translateY: translate }],
                                alignItems: "center",
                                ...style,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "#4F4F4F",
                                    height: 4,
                                    width: 34,
                                    borderRadius: 100,
                                    marginTop: 12,
                                    marginBottom: 20,
                                }}
                            />
                            {children}
                        </Animated.View>
                    </ScrollView>
                </CoverBackground>
            </Modal>
        </>
    )
}
export default ActionSheet
