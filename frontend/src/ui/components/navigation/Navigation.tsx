import { Logo } from "@/ui/design-system/logo/Logo"
import { Typography } from "@/ui/design-system/typography/Typography"
import { FC } from "react"
import { ActiveLink } from "./Active-link"
import { Button } from "@/ui/design-system/button/Button"
import { Container } from "../container/Container"
import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { LinkTypes } from "@/constants/app-types"
import { useAuth } from "@/context/AuthUserContext"


export const Navigation: FC = () => {
    const {authUser, authUserIsLoading} = useAuth()
    console.log("AuthUserIsLoading", authUserIsLoading)
    console.log("AuthUser", authUser)
    return(
            <div className="border-b-2 border-gray-400">
                <Container className="flex justify-between py-1.5">
                    <div className="flex items-center gap-2.5">
                        <ActiveLink href={"/"}>
                            <Logo size="small" />
                        </ActiveLink>
                        <div className="flex flex-col">
                            <div className="text-gray-800 font-extrabold text-[24px]">Coders Monkeys</div>
                            <Typography variant="caption-4" theme="gray">Trouve de l'inspiration & reçois des feedbacks</Typography>
                        </div>
                    </div>
                    <div className="flex items-center gap-7">
                        <div className="flex items-center gap-7">
                            <ActiveLink href="/design-system">Design System</ActiveLink>
                            <ActiveLink href="/projets">Projets</ActiveLink>
                            <ActiveLink href="/formations">Formations</ActiveLink>
                            <ActiveLink href="/contacts">Contacts</ActiveLink>
                        </div>
                        <div className="flex items-center gap-2">
                            <ButtonLink size="small" baseUrl="/connexion" linkType={LinkTypes.INTERNAL}>Connexion</ButtonLink>
                            <ButtonLink size="small" variant="secondary" baseUrl="/connexion/inscription" linkType={LinkTypes.INTERNAL}>Rejoindre</ButtonLink>
                        </div>
                    </div>
                </Container>
            </div>
    )
}