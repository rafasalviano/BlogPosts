import { LinkTypes } from "@/constants/app-types"
import { Container } from "@/ui/components/container/Container"
import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { Typography } from "@/ui/design-system/typography/Typography"
import { FC } from "react"
import { RiArrowRightLine, RiCheckboxCircleLine, RiCursorFill, RiCursorLine } from "react-icons/ri"
import Image from "next/image"

export const HighlightListView = () => {
    return (
    <>
        <Container className="py-24 space-y-16">
            <div className="flex flex-row gap-24 justify-center">
                <div className="relative w-[520px] h-[350px]">
                    <Image fill src="/assets/svg/cake.svg" alt="illustration d'un gateau" />
                </div>
                <div className="space-y-7 max-w-sm">
                        <div className="flex flex-col gap-3">
                            <Typography variant="h3" className="mb-3">De novice à developpeur en un clin d'oeil!</Typography>
                            <ListPoint>Progresse Rapidement</ListPoint>
                            <ListPoint>Inspire-toi</ListPoint>
                            <ListPoint>Gagne de l'assurance</ListPoint>
                        </div>
                        <div className="relative bg-gray-400 inline-block">
                            <ButtonLink variant="accent" icon={{icon: RiArrowRightLine}} iconPosition="right" baseUrl="/#" linkType={LinkTypes.INTERNAL}>Let's go</ButtonLink>   
                            <RiCursorFill size="24" className="absolute -bottom-4 right-8" />
                        </div>             
                </div>
            </div>
            <div className="flex flex-row-reverse gap-24 justify-center">
                <div className="relative w-[520px] h-[350px]">
                    <Image fill src="/assets/svg/top.svg" alt="illustration d'une toupie" />
                </div>
                <div className="space-y-7">
                        <div className="flex flex-col gap-3">
                            <Typography className="mb-3  max-w-sm" variant="h3">Booste ta carrière de developpeur</Typography>
                            <ListPoint>Partage tes projets, obtiens des feedbacks</ListPoint>
                            <ListPoint>Connecte-toi, élargis ton réseau pro!</ListPoint>
                            <ListPoint>Reste inspiré, motivé avec notre communauté.</ListPoint>
                        </div>
                        <div className="relative bg-gray-400 inline-block">
                            <ButtonLink variant="secondary" icon={{icon: RiArrowRightLine}} iconPosition="right" baseUrl="/#" linkType={LinkTypes.INTERNAL}>Démarrer</ButtonLink>                           </div>             
                </div>
            </div>
        </Container>
    </>
    )
}

interface ListPointInterface {
    children: React.ReactNode
}

const ListPoint: FC<ListPointInterface> = ( 
    {children} 
) => {
        return (
            <div className="flex items-center gap-2">
                <RiCheckboxCircleLine size="24" className="text-secondary"/>
                <Typography variant="body-lg">{children}</Typography>
            </div>
        )
    }