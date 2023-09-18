export const getLocalItem = (value: string) => {
    const item = localStorage.getItem(value)
    return item ? JSON.parse(item) : '';
}

export const setLocalItem = (key: string, value: unknown) => {
    const item = getLocalItem(key)
    const newValue = item ? [...item, value] : [value];
    localStorage.setItem(key, JSON.stringify(newValue));
}

export const removeLocalItem = (key: string, value: unknown) => {
    const item = getLocalItem(key)
    const newValue = item.length > 0 ? item.filter((val: unknown) => val !== value) : '';
    localStorage.setItem(key, JSON.stringify(newValue));
}