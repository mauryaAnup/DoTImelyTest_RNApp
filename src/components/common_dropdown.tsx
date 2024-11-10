import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AppColor } from "../utils/constants/colors";

type DropDownProps = {
    data: {
        value: string;
    }[],
    value: string | null,
    placeholder: string,
    onChange: (value: string) => void,
}

const DropDown: FC<DropDownProps> = (props) => {
    const { data, value, placeholder, onChange } = props;

    return (
        <Dropdown
            style={styles.dropdown}
            renderItem={({ value }) => {
                return (
                    <View
                        style={{
                            paddingVertical: 2,
                            justifyContent: 'center',
                            paddingHorizontal: 10
                        }}
                    >
                        <Text>
                            {`${value} ${placeholder}`}
                        </Text>
                    </View>
                )
            }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            maxHeight={300}
            labelField="value"
            valueField="value"
            placeholder={placeholder}
            value={`${value}`}
            onChange={item => {
                onChange(item.value);
            }}
        />
    )
}

export default DropDown;

const styles = StyleSheet.create({
    dropdown: {
        width: '32%',
        marginVertical: 5,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: AppColor.gray,
        backgroundColor: AppColor.white,
        borderRadius: 5,
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
    }
});