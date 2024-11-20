import { Alert } from "react-native";
import { TimerListProps } from "../components/create_timer_modal";

export const generateNumber = (num: number): { value: string }[] => {
    const result: { value: string }[] = [];
    for (let i = 0; i < num; i++) {
        result.push({ value: String(i).padStart(2, '0') })
    }
    return result;
}

export const generateUUID = (digits: number): string => {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';

    if (digits <= 0) return '';

    let uuid = [];
    for (let i = 0; i < digits; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
}

export const handleTimerCount = (timerData: TimerListProps) => {
    const newTotalSec = timerData.totalSec - 1;
    const hours = Math.floor(newTotalSec / 3600);
    const minutes = Math.floor((newTotalSec % 3600) / 60);
    const seconds = newTotalSec % 60;

    return { ...timerData, hours, min: minutes, sec: seconds, totalSec: newTotalSec };
}

export const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
}