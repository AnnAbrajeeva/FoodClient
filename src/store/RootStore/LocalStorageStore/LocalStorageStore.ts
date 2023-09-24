export default class LocalStorageStore {
  getLocalItem = (value: string) => {
    const item = localStorage.getItem(value);
    return item ? JSON.parse(item) : '';
  };

  setLocalItem = (key: string, value: unknown) => {
    const item = this.getLocalItem(key);
    const newValue = item ? [...item, value] : [value];
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  removeLocalItem = (key: string, value: unknown) => {
    const item = this.getLocalItem(key);
    const newValue = item.length > 0 ? item.filter((val: unknown) => val !== value) : '';
    localStorage.setItem(key, JSON.stringify(newValue));
  };
}
