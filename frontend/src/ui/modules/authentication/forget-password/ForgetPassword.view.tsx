import { Container } from "@/ui/components/container/Container"
import { Layout } from "@/ui/components/layout/layout"
import { Box } from "@/ui/design-system/box/Box"
import { Typography } from "@/ui/design-system/typography/Typography"
import Image from "next/image"
import Link from "next/link"
import { ForgetPasswordForm } from "./ForgetPassword.form"
import { FC } from "react"
import { FormsType } from "@/types/forms"

export interface IForgetPasswordView {
    form: FormsType
}

export const ForgetPasswordView:FC<IForgetPasswordView> = ({form}) => {
    return(
        <Layout>
            <Container className="grid grid-cols-2 items-center gap-20 mb-32">
                <div className="relative w-full h-[531px] ">
                    <Image 
                        src="/assets/images/character-3.png" 
                        alt="Illustration d'un homme rouge" 
                        fill
                        className="object-scale-down"
                    />
                </div>
                <div>
                    <Box className="">
                        <div className="flex items-center justify-between">
                            <Typography variant="h5">
                                Mot de passe perdu?
                            </Typography>
                            <Typography theme="primary" variant="caption-3">
                                <Link href="/connexion">
                                    Connexion
                                </Link>
                            </Typography>
                        </div>
                        <ForgetPasswordForm form={form}/>
                    </Box>
                </div>
            </Container>
        </Layout>
    )
}