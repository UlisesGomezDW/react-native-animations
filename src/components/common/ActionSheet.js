import React, { useState, useRef, useEffect } from 'react'
import { View, Modal, TouchableWithoutFeedback, Animated, Easing, PanResponder } from 'react-native'
//import { PanGestureHandler, State } from 'react-native-gesture-handler'

function ActionSheet(props) {
    const { style, children, onClose = () => null, visible } = props

    const [show, setShow] = useState(visible)
    const HEIGHT = style && style.height ? style.height : 300
    const duration = 300

    const animationRef = useRef(new Animated.Value(0)).current

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
        extrapolate: 'clamp',
    })

    return (
        <>
            <Modal statusBarTranslucent={true} visible={show} transparent>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={{ height: '100%', width: '100%', backgroundColor: '#00000080' }} />
                    </TouchableWithoutFeedback>

                    <Animated.View
                        style={{
                            width: '100%',
                            height: 200,
                            position: 'absolute',
                            backgroundColor: '#FFF',
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            bottom: 0,
                            transform: [{ translateY: translate }],
                            alignItems: 'center',
                            ...style,
                        }}
                    >
                        <Animated.View>
                            <>
                                <View
                                    style={{
                                        backgroundColor: '#4F4F4F',
                                        height: 4,
                                        width: 34,
                                        borderRadius: 100,
                                        marginTop: 12,
                                        marginBottom: 20,
                                    }}
                                />
                                {children}
                            </>
                        </Animated.View>
                    </Animated.View>
                </View>
            </Modal>
        </>
    )
}
export default ActionSheet
