export default function setLocalStorage(key: string, value: string) {
  window.localStorage.setItem(key, value);
}