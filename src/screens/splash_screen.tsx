import React, { FC, useEffect } from "react";
import { Animated, Image, Text, useAnimatedValue, View } from "react-native";
import { AppColor } from "../utils/constants/colors";
import { AppImages } from "../utils/constants/images";
import { CommonActions } from "@react-navigation/native";
import { NavigationKey } from "../utils/constants/strings";

const SplashScreen: FC<any> = (props) => {
    let fadeIn = useAnimatedValue(0);

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start(() => {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: NavigationKey.home
                    }]
                })
            )
        });
    }, [fadeIn]);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: AppColor.primary,
                justifyContent: "space-between",
                paddingVertical: 30
            }}
        >
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: '50%'
                }}
            >
                <Image
                    source={AppImages.ic_app_icon}
                    style={{
                        width: 120,
                        height: 120,
                    }}
                    resizeMode="center"
                />
                <Animated.Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 20,
                        textAlign: 'center',
                        opacity: fadeIn
                    }}
                >
                    {'DoTimely Test\nApp'}
                </Animated.Text>
            </View>
            <Text
                style={{
                    color: AppColor.black,
                    textAlign: "center",
                }}
            >
                Created by Anup Maurya
            </Text>
        </View>

    )
}

export default SplashScreen;