import { FC } from "react"
import { Spinner } from "./Spinner"

export const ScreenSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="large"/>
    </div>
  )
}