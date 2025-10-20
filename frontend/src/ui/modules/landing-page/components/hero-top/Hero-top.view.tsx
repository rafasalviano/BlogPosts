import { Container } from "@/ui/components/container/Container"
import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { Typography } from "@/ui/design-system/typography/Typography"
import Image from "next/image"
export const HeroTopView = () => {
    return (
        <Container className="relative pt-40 pb-52">
            <div className="w-full max-w-xl space-y-5">
                <Typography>Rejoins les singes codeurs!</Typography>
                <Typography variant="caption-2" theme="gray">Ici, on se prend pas la tête, mais on code comme des bêtes! 
                    Rejoins notre tribu de singes codeurs, partage tes projets les plus fous
                    et fais-toi de nouveaux amis développeurs.
                </Typography>
                <div className="flex gap-7">
                    <ButtonLink variant="accent" baseUrl={"/"} linkType={"internal"}>Commencer</ButtonLink>
                    <ButtonLink variant="secondary" baseUrl={"/"} linkType={"internal"}>En savoir plus {""}</ButtonLink>
                </div>
            </div>
                <Image 
                    width={800} 
                    height={800} 
                    src={"/assets/svg/rocket.svg"} 
                    alt={"illustration d'une fusée"}
                    className="absolute top-0 right-0 z-0"
                />
        </Container>
    )
}