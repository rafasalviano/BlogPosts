import { FormsType } from "@/types/forms"
import { Button } from "@/ui/design-system/button/Button"
import { Input } from "@/ui/design-system/input/Input"
import { FC } from "react"

interface IRegisterFormProps {
    form: FormsType
}

export const RegisterForm:FC<IRegisterFormProps> = ({form}) => {
    const {register, errors, isLoading, onSubmit, handleSubmit} = form
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
            <Input 
                placeholder="Johndoe@gmail.com" 
                type={"email"} 
                id={"email"} 
                register={register} 
                errors={errors} 
                errorMsg={"Tu dois renseigner ce champ"} 
                isLoading={isLoading} 
            />
            <Input 
                placeholder="Mot de passe" 
                type={"password"} 
                id={"password"} 
                register={register} 
                errors={errors} 
                errorMsg={"Tu dois renseigner ce champ"} 
                isLoading={isLoading} 
            />
            <Input 
                placeholder="Comment nous as-tu connus?" 
                type={"text"} 
                id={"how_did_hear"} 
                register={register} 
                errors={errors} 
                isLoading={isLoading}
            />
            <Button fullWidth type="submit" isLoading={isLoading}>S'inscrire</Button>
        </form>
    )
}