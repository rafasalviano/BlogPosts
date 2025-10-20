import React, {FC} from "react";
import clsx from "clsx";

type TypographyVariantType = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "lead" | "body-lg" | "body-base" | "body-sm" | "caption-1" | "caption-2" | "caption-3" | "caption-4";
type TypographyComponentType = "div" | "span" | "p" | "h1" | "h2" | "h3";
type TypographyThemeType = "black" | "gray" | "white" | "primary" | "secondary" | "danger" | "warning" | "success";
type TypographyWeightType = "regular" | "medium";

// on peut exporter le type

interface ITypographyProps {
    variant?: TypographyVariantType;
    component?: TypographyComponentType ;
    theme?: TypographyThemeType;
    weight?: TypographyWeightType;
    className?: string;
    children: React.ReactNode;
}

const variantStyles: Record<TypographyVariantType, string> = {
    display: "text-8xl",
    h1: "text-7xl",
    h2: "text-6xl",
    h3: "text-5xl",
    h4: "text-4xl",
    h5: "text-3xl",
    lead: "text-2xl",
    "body-lg": 'text-lg',
    "body-base": 'text-base',
    "body-sm": 'text-sm',
    "caption-1": "text-caption1",
    "caption-2": "text-caption2",
    "caption-3": "text-caption3",
    "caption-4": "text-caption4",
};

const colorStyles: Record<TypographyThemeType, string> = {
    black: "text-gray",
    gray: "text-gray-600",
    white: "text-white",
    primary: "text-primary",
    secondary: "text-secondary",
    danger: "text-alert-danger",
    warning: "text-alert-warning",
    success: "text-alert-success"
}
export const Typography: FC<ITypographyProps> = ({
    variant = "h1",
    component : Component ="div",
    theme = "black",
    weight = "regular",
    className,
    children,
 }) => {
    
    
    return(
        <Component className={clsx(variantStyles[variant], colorStyles[theme], className, weight === "medium" && "font-medium")}>
            {children}
        </Component>
    );                      
}