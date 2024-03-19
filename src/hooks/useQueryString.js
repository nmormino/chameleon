import { useEffect, useState } from 'react';
import JsonURL from '@jsonurl/jsonurl';
const useQueryString = (key, initialValue) => {
  const location = typeof window !== 'undefined' ? window.location : { search: '' };
  const queryParams = new URLSearchParams(location.search);

  const [state, setState] = useState(() => {
    const urlValue = queryParams.get(key);
    return urlValue !== null ? JsonURL.parse(urlValue, { AQF: true }) : initialValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip the following code during SSR

    const url = new URL(window.location);

    let valueToStore = state;
    if (Array.isArray(state) || typeof state === 'number') {
      valueToStore = JsonURL.stringify(state, { AQF: true });
    }

    url.searchParams.set(key, valueToStore);

    window.history.replaceState({}, '', url);

    return () => {
      if ((Array.isArray(state) && state.length === 0) || typeof state === 'number') {
        url.searchParams.delete(key);
        window.history.replaceState({}, '', url);
      }
    };
  }, [key, state, initialValue]);

  return [state, setState];
};

export default useQueryString;