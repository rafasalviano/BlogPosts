import { Box } from "@/ui/design-system/box/Box"
import { RegisterForm } from "./Register.form"
import Image from "next/image"
import { Typography } from "@/ui/design-system/typography/Typography"
import { Container } from "@/ui/components/container/Container"
import Link from "next/link"
import { FormsType } from "@/types/forms"
import { FC } from "react"

interface IRegisterViewProps {
    form: FormsType
}

export const RegisterView: FC<IRegisterViewProps> = ({form}) => {
    return (
        <>
            <Container className="grid grid-cols-2 gap-20 mb-20 items-center">
                <div className="relative w-full h-[531px]">
                    <Image 
                        src="/assets/images/character-2.png" 
                        alt="illustration d'un homme bleu" 
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object scale-down"
                    />
                </div>
                <div>
                    <Box>
                        <div className="flex items-center justify-between">
                            <Typography variant="h5">
                                Inscription
                            </Typography>
                            <div className="flex items-cente gap-2">
                                <Typography variant="caption-3">
                                    Tu as déjà un compte?
                                </Typography>
                                <Typography theme="primary" variant="caption-3"><Link href="/connexion">Connexion</Link></Typography>
                            </div>
                        </div>
                        <RegisterForm form={form}/>
                        <Typography variant="caption-4" theme="gray" className="max-w-md mx-auto space-y-1 text-center">
                            <div>
                                En t'inscrivant, tu acceptes les
                            </div>
                            <div>
                                <Link href="/#" className="text-gray">
                                    Conditions d'utilisation{" "} 
                                </Link>
                                {" "}et la{" "}
                                <Link href="/#" className="text-gray">
                                    Politique de confidentialité
                                </Link>
                                .
                            </div>
                        </Typography>
                    </Box>
                </div>
            </Container>
        </>
    )
}