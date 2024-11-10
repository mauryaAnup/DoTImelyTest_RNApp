export function generateNumber(num: number) {
    const result = [];
    for (let i = 0; i < num; i++) {
        result.push({ value: String(i).padStart(2, '0') })
    }
    return result;
}

export function generateUUID(digits: number) {
    let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    let uuid = [];
    for (let i = 0; i < digits; i++) {
        uuid.push(str[Math.floor(Math.random() * str.length)]);
    }
    return uuid.join('');
}