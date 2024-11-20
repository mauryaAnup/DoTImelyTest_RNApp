import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from "react";
import { NavigationKey } from '../utils/constants/strings';
import SplashScreen from '../screens/splash_screen';
import HomeScreen from '../screens/home_screen';
import { AppColor } from '../utils/constants/colors';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const NavigationRouter = () => {
    const navigationRef: any = React.createRef();
    const [currentScreenName, setCurrentScreen] = useState<string | undefined>("");

    useEffect(() => {
        const updateStatusBar = () => {
            const barStyle = currentScreenName === NavigationKey.home ? 'light-content' : 'dark-content';
            StatusBar.setBarStyle(barStyle, true);
        };

        if (navigationRef.current) updateStatusBar();
    }, [currentScreenName])

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                setCurrentScreen(navigationRef.current.getCurrentRoute().name);
            }}
            onStateChange={async () => {
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                setCurrentScreen(currentRouteName);
            }}
        >
            <StatusBar
                translucent
                backgroundColor={'transparent'}
            />

            <Stack.Navigator
                initialRouteName={NavigationKey.splash}
                screenOptions={() => ({
                    animation: "ios_from_right",
                    orientation: "portrait",
                    headerShown: false
                })}
            >
                <Stack.Screen
                    name={NavigationKey.splash}
                    component={SplashScreen}
                />
                <Stack.Screen
                    name={NavigationKey.home}
                    component={HomeScreen}
                    options={{
                        headerShown: true,
                        title: 'DoTimely Timer',
                        headerTintColor: AppColor.white,
                        headerStyle: {
                            backgroundColor: AppColor.header,
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationRouter;