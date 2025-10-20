/* 
theme, className, component Button .map
*/

import { FC } from "react";
import { footerSocialNetworkLinks } from "./App-links";
import { ButtonLink } from "@/ui/design-system/button/ButtonLink";
import { RiFacebookFill } from "react-icons/ri";
import clsx from "clsx";
import {v4 as uuidv4} from "uuid"

interface ISocialNetworkButtons {
    theme?: "accent" | "gray" | "secondary";
    className?: string;
}

export const SocialNetworkButtons: FC<ISocialNetworkButtons> = ({
    theme,
    className
}) => {
    const icoList = footerSocialNetworkLinks.map((element) => (
        <ButtonLink
             key={uuidv4()}
             variant="ico"
             icon={{icon: element.icon ? element.icon : RiFacebookFill}}
             iconTheme={theme}
             baseUrl={element.baseUrl}
             linkType={element.type}
        />
    ))
    
    return <div className={clsx("flex items-center gap-2",className)}>{icoList}</div>
}