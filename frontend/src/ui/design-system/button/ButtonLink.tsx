import { LinkType, LinkTypes } from "@/constants/app-types";
import Link from "next/link";
import { FC } from "react";
import { IButtonProps, Button } from "./Button";

type IButtonLinkProps = IButtonProps & {
    baseUrl: string;
    linkType: LinkType
}

export const ButtonLink: FC<IButtonLinkProps> = ({
    baseUrl,
    linkType,
    ...props
}) => {
    if (linkType === LinkTypes.INTERNAL) {
        return (
            <Link href={baseUrl}>
                <Button {...props} /> 
            </Link>
        )
    }

    return (
        <a href={baseUrl} target='_blank'>
            <Button {...props} />
        </a>
    )
}