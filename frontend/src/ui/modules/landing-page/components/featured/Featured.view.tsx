import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { Typography } from "@/ui/design-system/typography/Typography"
import  Image from "next/image"
import { Container } from "@/ui/components/container/Container"
import { v4 as uuidv4 } from "uuid"
import { RiArrowRightLine } from "react-icons/ri";
import { SocialNetworkButtons } from "@/ui/components/navigation/SocialNetworkButtons"

interface FeaturesListInterface {
    imagePath: string;
    imageAlt: string;
    title: string;
    description: string;
}

const featuresData: FeaturesListInterface[] = [
    {
        imagePath: "/assets/svg/diskette.svg",
        imageAlt: "illustration d'une diskette",
        title: "Ressources",
        description: "Consulte e partage des ressources pour les  devs"
    },
    {
        imagePath: "/assets/svg/loudspeaker.svg",
        imageAlt: "illustration des speakers",
        title: "Visibilité",
        description: "Expose tes projets et crée-toi des opportunités!"
    },
    {
        imagePath: "/assets/svg/joystick.svg",
        imageAlt: "illustration d'un joystick",
        title: "Entrainement",
        description: "Entraine toi à devenir meilleur et trouve de l'inspiration!"
    },
    {
        imagePath: "/assets/svg/boussole.svg",
        imageAlt: "illustration d'une boussole",
        title: "Relations",
        description: "Connecte-toi avec des devs web et booste ta carrière!"
    },
]

export const FeaturedView = () => {

    const featuredList = featuresData.map( feature => (
        <div 
            className="flex flex-col items-center justify-center bg-white rounded p-7"
            key = {uuidv4()}
        >
            <div className="relative w-[130px] h-[130px] rounded-[100%] mb-6 overflow-hidden">
                <Image fill src={feature.imagePath} alt={feature.imageAlt} className="object-scale-down blur-2xl"/>
                <Image fill src={feature.imagePath} alt={feature.imageAlt} className="object-scale-down"/>
            </div>
            <Typography variant="lead" weight="medium" component="h3" className="text-center mb-2.5">{feature.title}</Typography>
            <Typography variant="body-base" theme="gray" component="p" className="text-center">{feature.description}</Typography>
        </div>
    ))

    return (
    <>
        <div className="bg-gray-300">
            <Container className="grid grid-cols-12 gap-24 py-24">
                <div className="col-span-7 grid grid-cols-2 gap-7">
                    {featuredList}
                </div>
                <div className="col-span-5 flex flex-col justify-between">
                    <div>
                        <Typography variant="h2" component="h2" className="mb-5">
                            L'endroit le plus cool pout devenir développeur
                        </Typography>
                        <Typography variant="body-lg" component="p" theme="gray" className="mb-8">
                            Du partage, des connexions et des formations. Notre app gère tout ça pour toi. Rejoins la communauté et grimpe en grade. Let's go!
                        </Typography>
                        <ButtonLink baseUrl="/#" linkType="internal" variant="secondary" icon={{ icon: RiArrowRightLine }} iconPosition="right">
                            Commencer
                        </ButtonLink>
                    </div>
                    <div>
                        <Typography variant="caption-3" theme="gray" component="div" className="mb-4">Nos réseaux sociaux</Typography>
                        <SocialNetworkButtons />
                    </div>
                </div>
            </Container>
        </div>
    </>
    )
}