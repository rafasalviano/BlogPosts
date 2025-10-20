import clsx from "clsx"
import { FC } from "react"

interface TextBoxInterface {
  padding_y?: string
  padding_x?: string
  className?: string
  children: React.ReactNode
}

export const TextBox: FC<TextBoxInterface> = ({
  padding_x = "px-5",
  padding_y = "py-5",
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        "border border-gray-400 bg-white rounded w-full text-base leading-6 h-[30rem] overflow-auto",
        padding_y,
        padding_x,
        className
      )}
    >
      {children}
    </div>
  )
}
