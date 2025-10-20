import { IconSizeType } from '@/types/iconProps';
import clsx from 'clsx';
import { FC } from 'react';

type SpinnerVariantType = "primary" | "white";

interface ISpinnerProps {
  size?: IconSizeType;
  variant?: SpinnerVariantType;
}

const sizeStyles: Record<IconSizeType, string> = {
  small: "w-7 h-7",
  medium: "w-9 h-9",
  large: "w-12 h-12",
};

const variantStyles: Record<SpinnerVariantType, string> = {
    primary: "text-primary",
    white: "text-white",
}

export const Spinner: FC<ISpinnerProps> = ({
    size = "medium",
    variant = "primary"
}) => {
    return (
      <svg
        role="spinner"
        className={clsx(sizeStyles[size], variantStyles[variant], "animate-spin")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
      >
            <path 
                d="M100.971,20.567C144.368,21.088 179.439,56.481 179.439,100C179.439,143.844 143.844,179.439 100,179.439C70.026,179.439 43.907,162.802 30.381,138.266L47.59,128.393C57.687,146.977 77.381,159.604 100,159.604C132.896,159.604 159.604,132.896 159.604,100C159.604,67.39 133.359,40.861 100.857,40.402L100.971,20.567Z" 
                className="opacity-75"
                fill="currentColor"
            />
            <path 
                d="M30.381,138.266C24.123,126.913 20.561,113.869 20.561,100C20.561,56.156 56.156,20.561 100,20.561C100.324,20.561 100.648,20.563 100.971,20.567L100.857,40.402C100.572,40.398 100.286,40.396 100,40.396C67.104,40.396 40.396,67.104 40.396,100C40.396,110.277 43.003,119.95 47.59,128.393L30.381,138.266Z" 
                className="opacity-25"
                fill="currentColor"
            />
      </svg>
    );
}