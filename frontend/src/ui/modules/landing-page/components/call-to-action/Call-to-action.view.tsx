import { LinkTypes } from "@/constants/app-types"
import { Container } from "@/ui/components/container/Container"
import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { Typography } from "@/ui/design-system/typography/Typography"
import Image from "next/image"

export const CallToActionView = () => {
    return (
    <>
        <div className="relative overflow-hidden bg-primary">
            <Container className="relative py-20 flex flex-row">
                <div className="flex flex-col gap-7 max-w-2xl">
                    <Typography variant="h2" className="text-white">N'attends pas pour developper tes competences...</Typography>
                    <ButtonLink size="large" variant="success" baseUrl="/#" linkType={LinkTypes.EXTERNAL}>Formations React.js gratuites</ButtonLink>
                </div>
                <div className="">
                    <Image height="400" width="400" src="/assets/svg/bombers.svg" alt="illustration d'une bombe" className="absolute -bottom-24 blur-3xl"/>
                    <Image height="400" width="400" src="/assets/svg/bombers.svg" alt="illustration d'une bombe" className="absolute -bottom-24"/>
                </div>
            </Container>
        </div>
    </>
    )
}