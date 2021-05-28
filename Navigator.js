import "react-native-gesture-handler"
import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { HomeScreen, DetailScreen } from "./src/screens/shared-element-screen"
import ScaleScreen from "./src/screens/scale-screen"

const Stack = createSharedElementStackNavigator()

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                mode="modal"
                headerMode="none"
                screenOptions={{
                    headerTransparent: true,
                }}
                initialRouteName="Home"
            >
                <Stack.Screen name="Home" component={ScaleScreen} />
                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={() => ({
                        gestureEnabled: false,
                        transitionSpec: {
                            open: { animation: "timing", config: { duration: 500 } },
                            close: { animation: "timing", config: { duration: 200 } },
                        },
                        cardStyleInterpolator: ({ current: { progress } }) => {
                            return {
                                cardStyle: {
                                    opacity: progress,
                                },
                            }
                        },
                        cardStyle: {
                            backgroundColor: "transparent",
                        },
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator
