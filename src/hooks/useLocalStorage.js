import {useState, useEffect} from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    let storedValue;
    if (typeof window !== 'undefined') {
      storedValue = localStorage.getItem(key);
    }
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}