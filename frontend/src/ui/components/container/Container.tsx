import clsx from 'clsx';
import { FC, ReactNode } from 'react';
// div children

interface IContainer {
    children: ReactNode;
    className?: string;
}

export const Container: FC<IContainer> = ({
    children,
    className
}) => {
    return (
        <div className={clsx("w-full max-w-7xl mx-auto px-5 lg:px-10",className)}>
            {children}
        </div>
    )
}

//100% - 1280 pixels