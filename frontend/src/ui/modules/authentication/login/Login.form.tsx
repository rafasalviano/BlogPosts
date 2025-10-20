import { FormsType } from "@/types/forms"
import { Button } from "@/ui/design-system/button/Button"
import { Input } from "@/ui/design-system/input/Input"
import { FC } from "react"

interface ILoginForm {
    form: FormsType
}

export const LoginForm: FC<ILoginForm> = ({ form }) => {
    const{isLoading, register, errors, onSubmit, handleSubmit} = form
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
            <Input 
                placeholder={"Johndoe@gmail.com"} 
                type={"email"} 
                id={"email"} 
                register={register}
                errors={errors} 
                errorMsg={"Tu dois renseigner ce champ"} 
                isLoading={isLoading} 
            />
            <Input 
                placeholder={"Mot de passe"} 
                type={"password"} 
                id={"password"} 
                register={register}
                errors={errors} 
                errorMsg={"Tu dois renseigner ce champ"} 
                isLoading={isLoading} 
            />
            <Button fullWidth type="submit" isLoading={isLoading}>Se connecter</Button>
        </form>
    )
}