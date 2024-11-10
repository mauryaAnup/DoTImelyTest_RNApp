import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef } from "react";
import { NavigationKey } from '../utils/constants/strings';
import SplashScreen from '../screens/splash_screen';
import HomeScreen from '../screens/home_screen';
import { AppColor } from '../utils/constants/colors';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const NavigationRouter = () => {
    const routeRef: any = useRef();
    const navigationRef: any = React.createRef();

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                routeRef.current = navigationRef.current.getCurrentRoute().name;
            }}
            onStateChange={async () => {
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                routeRef.current = currentRouteName;
            }}
        >
            <StatusBar
                translucent
                backgroundColor={'transparent'}
                barStyle={routeRef.current === NavigationKey.home ? 'light-content' : 'dark-content'}
            />

            <Stack.Navigator
                initialRouteName={NavigationKey.splash}
                screenOptions={() => ({
                    animation: "ios_from_right",
                    orientation: "portrait"
                })}
            >
                <Stack.Screen
                    name={NavigationKey.splash}
                    component={SplashScreen}
                    options={{
                        headerShown: false
                    }}
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