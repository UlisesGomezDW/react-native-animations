import React, { useState, useRef } from 'react'
import { Button, Text } from 'react-native'
import Screen from './../components/layout/screen'
import ActionSheet from './../components/common/ActionSheet'

function Main() {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Screen
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ marginBottom: 20 }}>ActionSheet Example</Text>
                <Button title="open" onPress={() => setVisible(true)} />
                <ActionSheet visible={visible} onClose={() => setVisible(false)}>
                    <Text>Hola</Text>
                </ActionSheet>
            </Screen>
        </>
    )
}

export default Main
