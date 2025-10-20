import clsx from "clsx"
import { FC } from "react"

interface BoxInterface {
    padding_y?: string,
    padding_x?: string,
    className?: string,
    children: React.ReactNode
}
export const Box:FC<BoxInterface> = ({
    padding_x = "px-5",
    padding_y="py-5",
    className,
    children

}) => {
    return(
        <div className={clsx("border border-gray-400 bg-white rounded w-full",padding_y, padding_x, className)}>
            {children}
        </div>
    )
}