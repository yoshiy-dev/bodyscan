import { useEffect, useState } from 'react';

const useSessionStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void, () => void] => {
  // ローカルストレージから値を読み込む
  const readValue = (): T => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // 初期値を設定
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // storedValueが変更されるたびにローカルストレージに書き込む
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const serializedValue = JSON.stringify(storedValue);
      window.sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error writing sessionStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const setValue = (value: T) => setStoredValue(value);

  const removeValues = () => {
    window.sessionStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, removeValues];
};

export default useSessionStorage;
