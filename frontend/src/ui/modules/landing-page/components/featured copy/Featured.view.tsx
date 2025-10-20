import { LinkTypes } from "@/constants/app-types"
import { Container } from "@/ui/components/container/Container"
import { SocialNetworkButtons } from "@/ui/components/navigation/SocialNetworkButtons"
import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { Typography } from "@/ui/design-system/typography/Typography"
import Image from "next/image"
import {v4 as uuidv4} from "uuid"

interface FeaturedDataInterface {
    imageAlt: string,
    imagePath: string,
    title: string,
    description: string
}

const featuredData: FeaturedDataInterface[] = [
    {
        imageAlt: "illustration d'un joystick",
        imagePath: "/assets/svg/joystick.svg",
        title: "Entrainement",
        description: "Entraine toi à devenir meilleur et trouve de l'inspiration!"
    },
    {
        imageAlt: "illustration des speakers",
        imagePath: "/assets/svg/loudspeaker.svg",
        title: "Visibilité",
        description: "Expose tes projets et crée-toi des opportunités!"
    },
    {
        imageAlt: "illustration d'une diskette",
        imagePath: "/assets/svg/diskette.svg",
        title: "Ressources",
        description: "Consulte e partage des ressources pour les devs"
    },
    {
        imageAlt: "illustration d'une boussole",
        imagePath: "/assets/svg/boussole.svg",
        title: "Relations",
        description: "Connecte-toi avec des devs web et booste ta carrière!"
    }
]

export const FeaturedView2 = () => {
    const featuredList = featuredData.map( feature => 
        <div key={uuidv4()} className="flex flex-col justify-center items-center p-7 bg-white">
            <div className="relative h-[130px] w-[130px] rounded-[100%] overflow-hidden mb-6">
                <Image fill alt={feature.imageAlt} src={feature.imagePath} className="object-scale-down blur-2xl"/>
                <Image fill alt={feature.imageAlt} src={feature.imagePath} className="object-scale-down"/>
            </div>
            <Typography variant="lead" weight="medium" text-center="mb-2.5">{feature.title}</Typography>
            <Typography variant="body-base" theme="gray" className="text-center">{feature.description}</Typography>
        </div>
    )
    
    return (
        <div className="bg-gray-300">
            <Container className="grid grid-cols-12 gap-24 py-24">
                <div className="col-span-7 grid grid-cols-2 gap-7">
                    {featuredList}
                </div>
                <div className="col-span-5 flex flex-col justify-between">
                    <div>
                        <Typography variant="h2" className="mb-5">L'endroit le plus cool pout devenir développeur</Typography>
                        <Typography variant="body-lg" theme="gray" className="mb-8">Du partage, des connexions et des formations. Notre app gère tout ça pour toi. Rejoins la communauté et grimpe en grade. Let's go!</Typography>
                        <ButtonLink baseUrl="#" linkType={LinkTypes.INTERNAL} variant="secondary">Commencer</ButtonLink>
                    </div>
                    <div>
                        <Typography theme="gray" variant="caption-3" className="mb-4">Nos réseaux sociaux</Typography>
                        <SocialNetworkButtons />
                    </div>
                </div>
            </Container>
        </div>
    )
}

