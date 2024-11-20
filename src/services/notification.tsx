import { Alert, Linking, Platform } from "react-native";
import notifee, { AndroidImportance } from '@notifee/react-native';
import { AppColor } from "../utils/constants/colors";

const requestNotificationPermission = async () => {
    const permissionStatus = await notifee.requestPermission();
    if (permissionStatus.authorizationStatus >= 1) {
        return true;
    } else {
        return false;
    }
};

export const checkNotificationPermission = async () => {
    let granted = await requestNotificationPermission();
    if (!granted) {
        Alert.alert("Alert", "Need Notification Permission!",
            [
                {
                    text: "Allow",
                    onPress: () => Linking.openSettings()
                }
            ]
        )
    }
}

export const createNotificationChannel = async () => {
    await notifee.createChannel({
        id: 'timer-channel',
        name: 'Timer Notifications',
        importance: AndroidImportance.HIGH,
    });
};

export const displayNotification = async (title: string) => {
    await notifee.requestPermission();

    await notifee.displayNotification({
        title: 'DoTimely Timer Finished!',
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