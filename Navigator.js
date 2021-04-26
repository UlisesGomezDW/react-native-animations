import "react-native-gesture-handler"
import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createSharedElementStackNavigator } from "react-navigation-shared-element"
import { HomeScreen, DetailScreen } from "./src/screens/shared-element-screen"

const Stack = createSharedElementStackNavigator()

function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                screenOptions={{
                    headerTransparent: true,
                    gestureEnabled: false,
                }}
                initialRouteName="Home"
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={(navigation) => ({
                        headerBackTitleVisible: false,
                        cardStyleInterpolator: ({ current: { progress } }) => {
                            return {
                                cardStyle: {
                                    opacity: progress,
                                },
                            }
                        },
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator
