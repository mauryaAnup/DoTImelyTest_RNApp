import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, FlatList, Image, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import FloationButton from "../components/floating_action_button";
import { AppColor } from "../utils/constants/colors";
import { AppImages } from "../utils/constants/images";
import TimerModal, { TimerListProps } from "../components/create_timer_modal";
import notifee, { AndroidBadgeIconType, AndroidImportance } from '@notifee/react-native';

const HomeScreen: FC = () => {

    const timeoutRef: any = useRef<any>(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [timerList, setTimeList] = useState<TimerListProps[]>([]);

    useEffect(() => {
        if (timerList.length > 0 && !timeoutRef.current) startTimer();

        return () => {
            stopTimer();
        };
    }, [timerList]);

    useEffect(() => {

        const requestNotificationPermission = async () => {
            if (Platform.OS === 'android' && Platform.Version >= 33) {
                const permissionStatus = await notifee.requestPermission();
                if (permissionStatus.authorizationStatus >= 1) {
                    console.log('Notification permission granted.');
                } else {
                    console.log('Notification permission denied.');
                }
            }
        };

        const createNotificationChannel = async () => {
            await notifee.createChannel({
                id: 'timer-channel',
                name: 'Timer Notifications',
                importance: AndroidImportance.HIGH,
            });
        };

        requestNotificationPermission();
        createNotificationChannel();
    }, []);

    const displayNotification = async (title: string) => {
        await notifee.requestPermission();

        await notifee.displayNotification({
            title: 'Timer Finished!',
            body: `${title} has completed.`,
            android: {
                channelId: 'timer-channel',
                importance: AndroidImportance.HIGH,
                smallIcon: 'ic_launcher',
                largeIcon: 'ic_launcher',
                circularLargeIcon: true,
                color: AppColor.header,
            },
        });
    };

    const startTimer = () => {
        if (!timeoutRef.current) {
            timeoutRef.current = setInterval(updateTimer, 1000);
        }
    }

    const stopTimer = () => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const updateTimer = () => {
        setTimeList((prevData) => {
            const updatedData = prevData.map((timer) => {
                if (timer.totalSec > 0 && !timer.paused) {
                    const newTotalSec = timer.totalSec - 1;
                    const hours = Math.floor(newTotalSec / 3600);
                    const minutes = Math.floor((newTotalSec % 3600) / 60);
                    const seconds = newTotalSec % 60;

                    return { ...timer, hours, min: minutes, sec: seconds, totalSec: newTotalSec };
                }
                return timer;
            }).filter(timer => {
                timer.totalSec < 1 ? displayNotification(timer.title) : null
                return timer.totalSec > 0;
            });

            const allTimersCompleted = updatedData.every((timer) => timer.totalSec <= 0);
            if (allTimersCompleted) stopTimer();

            return updatedData;
        });
    }

    const pauseTimer = (id: string) => {
        setTimeList((prevData) =>
            prevData.map((timer) =>
                timer.id === id ? { ...timer, paused: !timer.paused } : timer
            )
        );
    };

    const resetTimer = (id: string) => {
        setTimeList((prevData) =>
            prevData.map((timer) =>
                timer.id === id
                    ? {
                        ...timer,
                        totalSec: timer.initialTotalSec,
                        hours: Math.floor(timer.initialTotalSec / 3600),
                        min: Math.floor((timer.initialTotalSec % 3600) / 60),
                        sec: timer.initialTotalSec % 60,
                    }
                    : timer
            )
        );
    };

    const deleteTimer = (id: string) => {
        Alert.alert("Alert", "Are you sure you want to delete?",
            [
                {
                    text: 'No',
                    style: "cancel"
                }, {
                    text: 'Yes',
                    onPress: () => {
                        setTimeList((prevData) => {
                            const updatedTimers = prevData.filter(timer => timer.id !== id);
                            if (updatedTimers.length === 0) {
                                stopTimer();
                            }
                            return updatedTimers;
                        });

                        ToastAndroid.show('Deleted Successfully!', ToastAndroid.LONG);
                    }
                }
            ]
        )
    }

    const renderTimerList = ({ item, index }: any) => {
        return (
            <View style={[styles.timerListContainer, { marginTop: index === 0 ? 10 : 20 }]}>
                <Text style={{ fontSize: 15, color: AppColor.black }}>
                    {item.title}
                </Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {item.hours}
                        <Text style={styles.timeDescription}> {"Hrs"} </Text>
                    </Text>
                    <Text style={styles.timeText}>
                        {item.min}
                        <Text style={styles.timeDescription}> {"Min"} </Text>
                    </Text>
                    <Text style={styles.timeText}>
                        {item.sec}
                        <Text style={styles.timeDescription}> {"Sec"} </Text>
                    </Text>
                </View>
                <View style={styles.timerActionContainer}>
                    <TouchableOpacity
                        style={styles.actionsButton}
                        onPress={() => pauseTimer(item.id)}
                    >
                        <Image
                            source={item.paused ? AppImages.ic_start_icon : AppImages.ic_pause_icon}
                            style={styles.actionsButtonIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionsButton}
                        onPress={() => resetTimer(item.id)}
                    >
                        <Image
                            source={AppImages.ic_reset_icon}
                            style={styles.actionsButtonIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionsButton}
                        onPress={() => deleteTimer(item.id)}
                    >
                        <Image
                            source={AppImages.ic_delete_icon}
                            style={{
                                width: 18,
                                height: 18,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={timerList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTimerList}
                    numColumns={1}
                    contentContainerStyle={styles.flatListContainer}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyListContainer}>
                                <Text style={styles.noDataText}>
                                    {`To create new Timer click '+'.`}
                                </Text>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <Text
                                style={{
                                    fontSize: 16,
                                    marginTop: 10,
                                    color: AppColor.gray
                                }}
                                numberOfLines={1}
                                ellipsizeMode="clip"
                            >
                                _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                                _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                            </Text>
                        )
                    }}
                />
            </View>

            <TimerModal
                isModalVisible={isModalVisible}
                timerList={timerList}
                addNewTimerToList={(data) => setTimeList(data)}
                closeModal={() => setModalVisible(prev => !prev)}
                startTimer={startTimer}
            />

            <FloationButton
                text="+"
                onPress={() => setModalVisible(prev => !prev)}
                disabled={timerList.length >= 5}
            />
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    flatListContainer: {
        marginTop: 10,
        paddingBottom: 40
    },
    emptyListContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "80%"
    },
    noDataText: {
        textAlign: "center",
        fontSize: 18,
        color: AppColor.black,
        fontWeight: "200"
    },
    timerListContainer: {
        backgroundColor: AppColor.primary,
        marginHorizontal: 50,
        padding: 10,
        justifyContent: "space-between",
        borderRadius: 2,
        elevation: 2
    },
    timeContainer: {
        flexDirection: 'row',
        width: '120%',
        backgroundColor: AppColor.secondary,
        alignSelf: "center",
        justifyContent: "center",
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius: 2,
        elevation: 2
    },
    timeText: {
        fontSize: 35,
        width: '32%',
        textAlign: "center",
        color: AppColor.white
    },
    timeDescription: {
        fontSize: 20,
        fontWeight: '300'
    },
    timerActionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 5,
        alignItems: "flex-end",
    },
    actionsButton: {
        height: 20,
        width: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    actionsButtonIcon: {
        width: 15,
        height: 15
    }
});