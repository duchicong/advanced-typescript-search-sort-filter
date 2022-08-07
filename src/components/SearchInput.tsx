import React from 'react';
import useDebounce from '../hooks/useDebounce';

export interface ISearchInputProps {
    setSearchQuery: (value: string) => void;
}

export function SearchInput (props: ISearchInputProps) {
    const { setSearchQuery } = props;
    const [query, setQuery] = React.useState<string>('');
    const debounceQuery = useDebounce(query, 250);

    React.useEffect(() => {
        if (debounceQuery !== "") {
            setSearchQuery(debounceQuery);
        }
    }, [debounceQuery, setSearchQuery]);

    return (
        <div>
            <label htmlFor="search" className='mt-3'>Search! Try me!</label>
            <input
                type="search"
                id="search"
                className='form-control full-width'
                placeholder='Search...'
                aria-label='Search'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
            />
        </div>
    )
}