import IFilter from "../interfaces/IFilter.ts";

export interface IFiltersProps<T> {
    properties: Array<IFilter<T>>;
    onChangeFilter: (property: IFilter<T>) => void;
    object: T;
}

export default function Filters<T> (props: IFiltersProps<T>) {
    const { properties, onChangeFilter, object } = props;
    return (
        <div className="p-1 mt-2">
            <label htmlFor="" className="mt-3">Filters! Try us too!</label>
            <br />
            {Object.keys(object).map(key => {
                return (
                    <>
                        <input
                            type="checkbox"
                            id={`${key}-true`}
                            key={`${key}-true`}
                            value={`${key}-true`}
                            onChange={() => onChangeFilter({ property: key as any, isTruthySelected: true })}
                            checked={properties.some(property => property.property === key && property.isTruthySelected)}
                            className="m-1 ml-3"
                        />
                        <label htmlFor={key}>'{key}' is truthy</label>
                        <input
                            type="checkbox"
                            id={`${key}-false`}
                            key={`${key}-false`}
                            value={`${key}-false`}
                            onChange={() => onChangeFilter({ property: key as any, isTruthySelected: false })}
                            checked={properties.some(property => property.property === key && !property.isTruthySelected)}
                            className="m-1 ml-3"
                        />
                        <label htmlFor={key}>'{key}' is falsy</label>
                        <br />
                    </>
                )
            })}
        </div>
    )
}