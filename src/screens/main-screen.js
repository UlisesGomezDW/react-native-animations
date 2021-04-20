import React, { useState, useRef } from "react"
import { Button, Text } from "react-native"
import Screen from "./../components/layout/screen"
import ActionSheet from "./../components/common/ActionSheet"
import { WIDTH_SCREEN, HEIGHT_SCREEN } from "./../util/constants"
function Main() {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Screen
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text style={{ marginBottom: 20 }}>ActionSheet Example</Text>
                <Text>
                    {HEIGHT_SCREEN}h - {WIDTH_SCREEN}w{" "}
                </Text>
                <Button title="open" onPress={() => setVisible(true)} />
                <ActionSheet style={{ height: 300 }} visible={visible} onClose={() => setVisible(false)}>
                    <Text>Hola</Text>
                </ActionSheet>
            </Screen>
        </>
    )
}

export default Main
