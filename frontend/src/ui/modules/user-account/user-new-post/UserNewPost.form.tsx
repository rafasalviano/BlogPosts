import { FormsType } from "@/types/forms"
import { Button } from "@/ui/design-system/button/Button"
import { Input } from "@/ui/design-system/input/Input"
import { TextArea } from "@/ui/design-system/text-area/Text-area"
import { FC } from "react"

interface IUserNewPostFormProps {
    form: FormsType
}

export const UserNewPostForm:FC<IUserNewPostFormProps> = ({form}) => {
    const {register, errors, isLoading, onSubmit, handleSubmit} = form
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
            <Input 
                placeholder="Título" 
                type={"text"} 
                id={"post_title"} 
                register={register} 
                errors={errors} 
                errorMsg={"Tu dois renseigner ce champ"} 
                isLoading={isLoading} 
                className="font-extrabold text-4xl text-gray-800"
            />
            <TextArea 
                placeholder="Sobre o que está pensando...?" 
                type={"text"} 
                id={"post"} 
                register={register} 
                errors={errors} 
                errorMsg={"Tu dois renseigner ce champ"} 
                isLoading={isLoading}
                className="min-h-[30rem] text-xl text-gray-800"
            />

            <Button fullWidth type="submit" isLoading={isLoading}>C'est fait!</Button>
        </form>
    )
}