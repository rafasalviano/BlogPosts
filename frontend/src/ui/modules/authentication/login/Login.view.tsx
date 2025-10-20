import { Container } from "@/ui/components/container/Container"
import { Box } from "@/ui/design-system/box/Box"
import { Typography } from "@/ui/design-system/typography/Typography"
import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "./Login.form"
import { FormsType } from "@/types/forms"
import { FC } from "react"

interface ILoginForm {
    form: FormsType
}

export const LoginView:FC<ILoginForm> = ({form}) => {
    return (
        <Container className="grid grid-cols-2 gap-20 mb-32">
            <div className="relative bg-primary-200 h-[531px]">
                <Image 
                    src="/assets/images/character-1.png" 
                    alt="image d'un homme bleu" 
                    fill
                    className=" bg-white"
                />
            </div>
            <div className="flex items-center">
                <Box padding_y="py-9" padding_x="px-9" className="w-full ">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5">Connexion</Typography>
                        <div className="flex item-center gap-2">
                            <Typography variant="caption-3">Tu n'as pas de compte?</Typography>
                            <Typography variant="caption-3" theme="primary">
                                <Link href="/connexion/inscription">S'inscrire</Link>
                            </Typography>
                        </div>
                    </div>
                    <LoginForm form={form} />
                    <Typography
                        variant="caption-4" theme="primary" className="max-w-md mx-auto space-y-1 text-center">
                            <Link href="/connexion/mot-de-passe-perdu" className="flex justify-center">
                                Mot de passe perdu ?
                            </Link>
                    </Typography>
                </Box>
            </div>
        </Container>
    )
}