import React from 'react'
import { View } from 'react-native'
import Constants from 'expo-constants'

function Screen(props) {
    const { children, style } = props
    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                    paddingTop: Constants.statusBarHeight,
                    ...style,
                }}
            >
                {children}
            </View>
        </>
    )
}

export default Screen
