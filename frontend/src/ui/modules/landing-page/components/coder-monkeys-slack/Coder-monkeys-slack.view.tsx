import Image from "next/image"
import { Container } from "@/ui/components/container/Container"
import { Typography } from "@/ui/design-system/typography/Typography"
import { Button } from "@/ui/design-system/button/Button"
import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { LinkTypes } from "@/constants/app-types"
import { Logo } from "@/ui/design-system/logo/Logo"


export const CoderMonkeysSlackView = () => {
    return (
        <Container className="flex flex-row items-center justify-between py-10">
            <div className="flex flex-col space-y-5 max-w-xl">
                <div className="flex flex-row items-center gap-1">
                    <Logo size="extra-small"/>
                    <Typography variant="caption-2">Coder Monkeys</Typography>
                </div>
                <Typography variant="h2" className="max-w-xl">Rejoins-nous sur le Slack des singes codeurs</Typography>
                <Typography variant="body-lg" theme="gray" className="max-w-md">Rejoins-nous et obtiens de l'aide, des conseils et pourquoi pas des nouveaux potes!</Typography>
                <ButtonLink size="large" baseUrl="/#" linkType={LinkTypes.EXTERNAL}>Rejoindre le groupe d'aide</ButtonLink>
            </div>
            <div className="relative h-[400px] w-[400px] z-0">
                <Image fill src="/assets/svg/slack.svg" alt="illustration d'un logo Slack" className="blur-3xl" />
                <Image fill src="/assets/svg/slack.svg" alt="illustration d'un logo Slack" className="object-scale-down" />
            </div>
        </Container>
    )
}