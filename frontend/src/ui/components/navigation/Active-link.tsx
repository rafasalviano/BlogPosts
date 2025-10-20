/*

useRouter() -> router.pathname
href

Link

useMemo ,[]

*/

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode, useMemo } from "react";

interface IActiveLinkProps {
    href: string;
    children: ReactNode;
}

export const ActiveLink: FC<IActiveLinkProps> = ({
    href,
    children
}) => {
    const router = useRouter()
    
    const isActive: boolean = useMemo(()=>{
        return href === router.pathname
    },[href, router.pathname])

    return (
        <Link href={href} className={clsx(isActive && "font-medium text-primary")}>
            {children}
        </Link>
    )
}

