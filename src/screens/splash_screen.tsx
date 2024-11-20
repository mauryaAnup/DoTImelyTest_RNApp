import React, { FC, useEffect } from "react";
import { Animated, Image, StyleSheet, Text, useAnimatedValue, View } from "react-native";
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
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={AppImages.ic_app_icon}
                    style={styles.logo}
                    resizeMode="center"
                    accessible={true}
                    accessibilityLabel="App logo"
                />
                <Animated.Text style={[styles.title, { opacity: fadeIn }]}>
                    {'DoTimely Test\nApp'}
                </Animated.Text>
            </View>
            <Text style={styles.footerText}>
                Created by Anup Maurya
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.primary,
        justifyContent: "space-between",
        paddingVertical: 30
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: '50%'
    },
    logo: {
        width: 120,
        height: 120
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        textAlign: 'center',
    },
    footerText: {
        color: AppColor.black,
        textAlign: "center",
    }
});

export default SplashScreen;