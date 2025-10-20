import { FC } from "react";
import { footerAppLinks } from "./App-links";
import { v4 as uuidv4 } from "uuid"
import { Typography } from "@/ui/design-system/typography/Typography";
import { ActiveLink } from "./Active-link";
import Image from "next/image";
import { Container } from "@/ui/components/container/Container";
import { LinkTypes } from "@/constants/app-types";
import { FooterLinks } from "@/types/app-links";
import { SocialNetworkButtons } from "./SocialNetworkButtons";
/* 
je pense que c'est important d'écrire ce que je vais faire 
J'ai un tableau d'objets
Je vais maper un tableau et envoyer chaque element à un deuxième composant qui
les reçoit comme un paramètre.
Dans ce deuxième composant, je retourne un div avec deux Typography.
Dans la première, le titre.
Dans la deuxième, je mape le sub-tableau, avec une div qui contient 2 conditionnelles
Il faut retourner une seule balise avec key={uuidv4()} dedans. Cette balise pourra être div ou un composant.
À condition qu'elle soit unique
=> (div)
=> (composant)
*/

export const Footer: FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="bg-gray">
            <Container className="flex justify-between pt-16">
                <div className="flex flex-col items-center gap-1">
                    <Typography theme="white" variant="caption-1">Formations gratuites</Typography>
                    <Typography theme="gray" variant="caption-3">Abonne-toi à la chaine</Typography>
                    <a href="https://youtube.com" target="_blank"><Image src={"/assets/svg/YTB.svg"} alt={"Image de youtube"} width={229} height={216} /></a>                </div>
                <div className="flex items-top gap-20 pr-20">
                    {footerAppLinks.map((element) => (
                        <LinksList data={element} key={uuidv4()} />
                    ))}
                </div>
            </Container>
            <Container className="pt-9 pb-11 space-y-11">
                <hr className="text-gray-800" />
                <div className="flex items-center justify-between">
                    <Typography variant="caption-4" theme="gray">
                        Copyright ® {currentYear} | Propulsed by
                        <a href="https://arnaud-desportes.fr"> Arnaud Desportes </a>
                        - Remote Monkey SASU
                    </Typography>
                    <div className="">
                        <SocialNetworkButtons theme="gray"/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

interface ILinksList {
    data: FooterLinks
}

const LinksList: FC<ILinksList> = ({ data }) => {
    return (
        <div className="">
            <Typography theme="white" variant="caption-2" weight="medium" className="pb-5">
                {data.label}
            </Typography>
            <Typography theme="gray" variant="caption-3" className="space-y-4">
                {data.links.map((element) => (
                    // on va créer un tableau, donc il faut le stocker dans une variable
                    //pas vraiment, non, ce n'est pas nécessaire
                    <div key={uuidv4()}>
                        {element.type === LinkTypes.INTERNAL && <ActiveLink href={element.baseUrl}>{element.label}</ActiveLink>}
                        {element.type === LinkTypes.EXTERNAL && <a href={element.baseUrl} target="_blank">{element.label}</a>}
                    </div>
                ))}
            </Typography>
        </div>
    )
}