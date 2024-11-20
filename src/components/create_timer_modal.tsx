import React, { FC, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppColor } from "../utils/constants/colors";
import DropDown from "./common_dropdown";
import { generateNumber, generateUUID, showAlert } from "../utils/helper";

export type TimerListProps = {
    id: string,
    title: string,
    hours: number,
    min: number,
    sec: number,
    totalSec: number,
    initialTotalSec: number,
    paused: boolean
}

type TimerModalProps = {
    isModalVisible: boolean,
    timerList: TimerListProps[],
    addNewTimerToList: (data: TimerListProps[]) => void,
    closeModal: () => void,
    startTimer: () => void
}

const TimerModal: FC<TimerModalProps> = (props) => {

    const { isModalVisible, timerList, addNewTimerToList, closeModal, startTimer } = props;

    const [timerTitle, setTimerTitle] = useState<string | null>(null);
    const [selectedHours, setHours] = useState<string | null>(null);
    const [selectedMin, setMin] = useState<string | null>(null);
    const [selectedSec, setSec] = useState<string>('30');

    const onTimerCreate = () => {
        if ((selectedHours === '00' || selectedHours === null) && selectedMin === '00' && selectedSec === '00') {
            showAlert("Alert", "Please select valid time!");
        } else {
            const totalSec = (parseInt(selectedHours ?? '00') * 3600) + (parseInt(selectedMin ?? '00') * 60) + parseInt(selectedSec);
            const data = {
                id: generateUUID(32),
                title: timerTitle ?? `Timer ${timerList.length + 1}`,
                hours: parseInt(selectedHours ?? '00'),
                min: parseInt(selectedMin ?? '00'),
                sec: parseInt(selectedSec),
                totalSec,
                initialTotalSec: totalSec,
                paused: false
            };
            const newData = [...timerList, data];

            addNewTimerToList(newData);
            clearAllData();
            startTimer();
        }
    }

    const clearAllData = () => {
        setTimerTitle(null);
        setHours(null);
        setMin(null);
        setSec('30');
        closeModal();
    }

    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.modalMainContainer}>
                <View style={styles.mainContainer}>
                    <Text style={styles.modalTitle}> Create New Timer </Text>
                    <Text style={{ color: AppColor.black }}> Enter Title </Text>
                    <TextInput
                        placeholder="Enter Timer Title"
                        placeholderTextColor={AppColor.gray}
                        style={styles.titleTextInput}
                        multiline={false}
                        value={timerTitle ?? `Timer ${timerList.length + 1}`}
                        onChangeText={(text) => {
                            setTimerTitle(text);
                        }}
                    />
                    <Text style={{ color: AppColor.black, marginTop: 5 }}> Select Time </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <DropDown
                            data={generateNumber(24)}
                            value={selectedHours}
                            placeholder="Hrs"
                            onChange={(value: string) => {
                                setHours(value);
                            }}
                        />
                        <DropDown
                            data={generateNumber(60)}
                            value={selectedMin}
                            placeholder="Min"
                            onChange={(value: string) => {
                                setMin(value);
                            }}
                        />
                        <DropDown
                            data={generateNumber(60)}
                            value={selectedSec}
                            placeholder="Sec"
                            onChange={(value: string) => {
                                setSec(value);
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 15
                        }}
                    >
                        <TouchableOpacity
                            style={styles.modalButtons}
                            activeOpacity={0.7}
                            onPress={onTimerCreate}
                        >
                            <Text style={styles.buttonsText}> Create </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButtons, { backgroundColor: '#FA3F41', marginRight: 0 }]}
                            activeOpacity={0.7}
                            onPress={clearAllData}
                        >
                            <Text style={styles.buttonsText}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default TimerModal;

const styles = StyleSheet.create({
    modalMainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: "center",
    },
    mainContainer: {
        marginHorizontal: 25,
        backgroundColor: AppColor.primary,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 2,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 10,
        color: AppColor.black
    },
    titleTextInput: {
        marginVertical: 5,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: AppColor.gray,
        backgroundColor: AppColor.white,
        borderRadius: 5,
        elevation: 2,
        color: AppColor.black
    },
    modalButtons: {
        height: 38,
        width: '48%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColor.header,
        borderRadius: 10,
        marginRight: 10
    },
    buttonsText: {
        fontSize: 15,
        fontWeight: "500",
        color: AppColor.white
    }
});