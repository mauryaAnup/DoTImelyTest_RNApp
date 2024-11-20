import React, { FC } from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { AppColor } from "../utils/constants/colors";
import { showAlert } from "../utils/helper";

type FloatingButtonProps = {
    text?: string,
    disabled?: boolean,
    onPress?: (event: GestureResponderEvent) => void
}

const FloatingButton: FC<FloatingButtonProps> = (props) => {
    const { text, disabled, onPress } = props;

    const showToast = () => {
        showAlert("Limit Alert", "You can only have 5 timers at a time!");
    }

    return (
        <TouchableOpacity
            style={{
                position: "absolute",
                bottom: '6%',
                right: '7%',
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