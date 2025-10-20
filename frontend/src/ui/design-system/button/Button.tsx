import { FC } from 'react';
import { IIcon } from "@/types/iconProps";
import clsx from 'clsx';
import { Spinner } from '../spinner/Spinner';
import { LinkType, LinkTypes } from '@/constants/app-types';
import Link from 'next/link';
type ButtonSizeType = "small" | "medium" | "large";
type ButtonVariantType = "accent" | "secondary" | "outline" | "ico" | "success" | "danger";
type ButtonIconPosition = "right" | "left";
type ButtonIconThemeType = "accent" | "secondary" | "gray"


export interface IButtonProps {
  type?: "submit" | "button"
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  icon?: IIcon;
  iconPosition?: ButtonIconPosition;
  iconTheme?: ButtonIconThemeType;
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean
  action?: Function
}

const variantStyles: Record<ButtonVariantType, (iconTheme: ButtonIconThemeType)=> string> = {
    accent: ()=> "bg-primary hover:primary-400 text-white rounded",
    secondary: ()=> "bg-primary-200 hover:primary-300/500 text-primary rounded",
    outline: ()=> "bg-white hover:gray-400/500 text-gray border border-gray-500 rounded",
    ico: (iconTheme)=> {
        if (iconTheme === "secondary") {
            return "bg-primary-200 hover:primary-300/500 text-primary rounded-[100%]"
        }
        if (iconTheme === "gray") {
            return "bg-gray-700 hover:gray-600 text-white rounded-[100%]"
        }
        return "bg-primary hover:primary-400 text-white rounded-[100%]"
    },
    success: ()=> "bg-secondary hover:secondary-400 text-white rounded",
    danger: ()=> "bg-alert-danger hover:bg-alert-danger/75 text-white rounded"
}

let iconSize: number = 0;

const sizeStyle = "text-caption3 font-medium"

const sizeStyles: Record<ButtonSizeType, (variant: ButtonVariantType)=> string> = {
    small: (variant) => {
        iconSize = 18;
        if (variant === "ico") {
            return `w-[40px] h-[40px] flex items-center justify-center ${sizeStyle}`;
        }
        return `px-[14px] py-[12px] ${sizeStyle}`
    },
    medium: (variant)=> {
        iconSize = 20;
        if (variant === "ico") {
            return `w-[50px] h-[50px] flex items-center justify-center ${sizeStyle}`;
        }
        return `px-[18px] py-[15px] ${sizeStyle}`
    },
    large: (variant)=> {
        iconSize = 24;
        if (variant === "ico") {
            return `w-[60px] h-[60px] flex items-center justify-center ${sizeStyle}`;
        }
        return `px-[22px] py-[18px] ${sizeStyle}`
    }
}

export const Button: FC<IButtonProps> = ({
    type ="submit",
    size = "medium",
    variant = "accent",
    icon,
    iconPosition ="right",
    iconTheme ="accent",
    disabled,
    isLoading = false,
    children,
    fullWidth,
    action = () => {}
}) => {    
    const handleClick = () => {
            if(action) {
                action()
            }
        }

    return (
        <button
            type={type}
            className={clsx(
                variantStyles[variant](iconTheme),
                sizeStyles[size](variant),
                iconSize,
                isLoading && "cursor-wait",
                "relative hover:opacity-75",
                "disabled:opacity-75 disabled:cursor-not-allowed",
                fullWidth && "w-full"
            )}
            onClick={handleClick}
            disabled={disabled || isLoading} /* se deixasse assim, todos ficariam cinza igualmente */
        >
            {isLoading && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    {variant === "accent" || variant === "ico" ? (
                        <Spinner size="small" variant="white" />
                    ) : (
                        <Spinner size="small" />
                    )}
                </div>
            )}
            <div className={clsx(isLoading && "invisible")}>
                {icon && variant === "ico" ? (
                    <icon.icon size={iconSize} />
                ) : (
                    <div className={clsx(icon && "flex items-center gap-1")}>
                        {icon && iconPosition === "left" && (<icon.icon size={iconSize} />)}
                        {children}
                        {icon && iconPosition === "right" && (<icon.icon size={iconSize} />)}
                    </div>
                )
                }
            </div>
        </button>
    );
}

// === strictement egal


/* 

buttonElement

buttonContent

si baseUrl --> linkType est internal Link
               linkType est external a _blank
*/