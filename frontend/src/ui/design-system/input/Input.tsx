import clsx from "clsx";
import { register } from "module";
import { FC } from "react";
import { Typography } from "../typography/Typography";
import postcss from "postcss";

interface IInputProps {
    placeholder: string,
    type?: "email" | "password" | "text",
    id: "email" | "password" | "how_did_hear" | "post" | "post_title",
    register: any,
    errors: any,
    errorMsg?: string,
    required?: boolean,
    isAutocompleted?: boolean,
    isLoading: boolean,
    className?: string
    autoFocus?: boolean
}

export const Input: FC<IInputProps> = ({
    placeholder,
    type = "text",
    id,
    register,
    errors,
    errorMsg = "Tu dois renseigner ce champ",
    required = true,
    isAutocompleted = false,
    isLoading,
    className,
    autoFocus
}) => {
    return(
        <div className="space-y-2">
            <input 
                type={type}
                autoFocus={autoFocus}
                placeholder={placeholder}
                className={clsx(
                    "rounded w-full border border-gray-600 p-3 focus:ring-1 focus:ring-primary focus:outline-none font-light text-gray-700",
                    errors[id] ? "placeholder-alert-danger text-alert-danger" : "placeholder-gray-600",
                    isAutocompleted ? "yes" : "off",
                    isLoading && "cursor-not-allowed",
                    className
                )}
                {...register(id, {required: {value: required, message: errorMsg}})}
                disabled={isLoading}
            />
            {errors[id] && <Typography theme="danger" variant="caption-3">{errors[id]?.message}</Typography>}
        </div>
    )
}