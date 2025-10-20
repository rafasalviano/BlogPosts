/* SIDEBAR - 1 div with 2 Typography, 1 button, all in one column

Vertical spacing: larger GAP-7 between the Links block and Logout button, smaller GAP-3 between the two links.
Typography: both links styled in caption2 size, medium weight.
Button: styled in "danger" (red) for logout.

BOX
----------------
Mon Compte      |                   ActiveLink → /meu-espaco/mon-compte
Mes Projets     |                   ActiveLink → /meu-espaco/mes-projets
                |
[ Déconnexion ] |                   (🔴 danger variant) → "Déconnexion" (calls handleLogOutUser)
----------------
*/

import { Box } from "@/ui/design-system/box/Box"
import { Button } from "@/ui/design-system/button/Button"
import { Typography } from "@/ui/design-system/typography/Typography"
import { ActiveLink } from "./Active-link"
import { firebaseLogOutUser } from "@/api/Authentication"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { RiAddLine, RiArrowRightLine } from "react-icons/ri"


export const UserAccountNavigation = () => {
    const router = useRouter()
    const handleLogOutUser = async () => {
        const {error} = await firebaseLogOutUser()
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success("À bientôt sur Coders Monkeys")
        router.push("/connexion")
    }
    
    return(
        <Box className="flex flex-col gap-7 grow">
            <div className="flex flex-col gap-3">
                <Typography weight="medium" variant="caption-2"><ActiveLink href="/meu-espaco/mon-compte">Minha conta</ActiveLink></Typography>
                <Typography weight="medium" variant="caption-2"><ActiveLink href="/meu-espaco/post">Meus posts</ActiveLink></Typography>
                <Typography weight="medium" variant="caption-2" className="inline">    
                    <ActiveLink href="/meu-espaco/new-post">
                        <div className="flex flex-row items-center gap-1">
                            <RiAddLine className="text-primary text-5xl" />
                            Novo Post
                        </div>                        
                    </ActiveLink>
                </Typography>

            </div>
        </Box>
)
}

//    <Button action={handleLogOutUser} variant="danger">Sair</Button>
