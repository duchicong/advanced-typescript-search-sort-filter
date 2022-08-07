import React from 'react';

export default function useDebounce(value: any, delay: number) {
    const [debounceValue, setDebounceValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    });

    return debounceValue;
}