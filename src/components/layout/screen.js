import React from "react"
import { View } from "react-native"
import { STATUS_BAR_HEIGHT } from "./../../util/constants"

function Screen(props) {
    const { children, style } = props
    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#FFF",
                    paddingTop: STATUS_BAR_HEIGHT,
                    ...style,
                }}
            >
                {children}
            </View>
        </>
    )
}

export default Screen
