import React from "react";
import ISorters from "../interfaces/ISorters";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";
import genericSort from "../utils/genericSort";

export interface ISortersProps<T> {
    dataSource: T[];
    initialSortProperty: keyof T;
}

export function Sorters<T> (props: PropsWithChildrenFunction<ISortersProps<T>, T>) {
    const { dataSource, children, initialSortProperty } = props;
    const [sortProperty, setSortProperty] = React.useState<ISorters<T>>({
        property: initialSortProperty,
        isDescending: false
    });
    const object = dataSource.length > 0 ? dataSource[0] : {};

    return (
        <>
            <label htmlFor="sorters" className="mt-3">Sorters! Try us too!</label>
            <select
                name=""
                id="sorters"
                className="custom-select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const values = e.target.value.split('-');

                    if (values.length === 2) {
                        setSortProperty({
                            property: values[0] as keyof T,
                            isDescending: values[1] === 'true'
                        })
                    }
                }}
            >
                {
                    Object.keys(object).map(key => {
                        return (
                            <>
                                <option value={`${key}-true`} key={`${key}-true`}>Sort by '{key}' descending!</option>
                                <option value={`${key}-false`} key={`${key}-false`}>Sort by '{key}' ascending!</option>
                            </>
                        )
                    })
                }
            </select>
            {
                children && dataSource
                .sort((a, b) => genericSort(a, b, sortProperty))
                .map(item => children(item))
            }
        </>
    )
}