import React, { FC } from "react";
import { GestureResponderEvent, Text, ToastAndroid, TouchableOpacity } from "react-native";
import { AppColor } from "../utils/constants/colors";

type FloatingButtonProps = {
    text?: string,
    disabled?: boolean,
    onPress?: (event: GestureResponderEvent) => void
}

const FloatingButton: FC<FloatingButtonProps> = (props) => {
    const { text, disabled, onPress } = props;

    const showToast = () => {
        ToastAndroid.show("You can only have 5 timers at a time!", ToastAndroid.LONG);
    }

    return (
        <TouchableOpacity
            style={{
                position: "absolute",
                bottom: '5%',
                right: '5%',
                height: 55,
                width: 55,
                borderRadius: 15,
                elevation: 2,
                backgroundColor: AppColor.header,
                alignItems: "center",
                justifyContent: 'center'
            }}
            activeOpacity={0.7}
            onPress={disabled ? showToast : onPress}
        >
            <Text
                style={{
                    transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }],
                    includeFontPadding: false,
                    color: AppColor.white
                }}
            >
                {text ?? '+'}
            </Text>
        </TouchableOpacity>
    )
}

export default FloatingButton;