type PropsWithChildrenFunction<P, T> = P & { children?(item: T): React.ReactNode };

export default PropsWithChildrenFunction;