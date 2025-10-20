import { Box } from "@/ui/design-system/box/Box"
import Image from "next/image"
import { Typography } from "@/ui/design-system/typography/Typography"
import { Container } from "@/ui/components/container/Container"
import Link from "next/link"
import { FormsType } from "@/types/forms"
import { FC } from "react"
import { UserNewPostForm } from "./UserNewPost.form"

interface IUserNewPostViewProps {
    form: FormsType
}

export const UserNewPostView: FC<IUserNewPostViewProps> = ({form}) => {
    return (
        <>
            <Container className="grid grid-cols-4 gap-20 mb-20 items-center">
                <div className="col-span-4">
                    <Box>
                        <div className="flex items-center justify-between">
                            <Typography className="text-gray-700" variant="h5">
                                Nouveau Post
                            </Typography>
                            <div className="flex items-cente gap-2">
                                <Typography variant="caption-3">
                                    Tu veux voir la liste de tes posts precedents?
                                </Typography>
                                <Typography theme="primary" variant="caption-3">
                                    <Link href="/meu-espaco/post">
                                        Mes posts
                                    </Link>
                                </Typography>
                            </div>
                        </div>
                        <UserNewPostForm form={form}/>
                    </Box>
                </div>
            </Container>
        </>
    )
}


// import { Box } from "@/ui/design-system/box/Box"
// import { TextBox } from "@/ui/design-system/box/Text-box"
// import { Input } from "@/ui/design-system/input/Input"
// import { Typography } from "@/ui/design-system/typography/Typography"


// export const UserNewPostContainer = () => {
//     return(
//         <>
//             <Typography variant="h4" theme="gray">Nouveau Post</Typography>
//             <div className="flex justify-center pt-20 pb-40">
//                 <TextBox>
//                     <Input placeholder={""} id={"email"} register={undefined} errors={undefined} isLoading={false}>Titre</Input>
//                     <textarea className="w-full h-full resize-none outline-none placeholder-gray-700 placeholder:text-lg" placeholder="Il y en a quoi dans ta tête...?" />
//                 </TextBox>
//             </div>
//         </>
//     )
// }