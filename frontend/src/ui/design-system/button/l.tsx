import {Button, IButtonProps} from "@/ui/design-system/button/Button";
import {LinkType, LinkTypes} from "@/constants/app-types";
import {FC} from "react";
import Link from "next/link";

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
        return <Link href={baseUrl}><Button {...props}/></Link>
    }
    return <a href={linkType} target="_blank"><Button {...props}/></a>
}