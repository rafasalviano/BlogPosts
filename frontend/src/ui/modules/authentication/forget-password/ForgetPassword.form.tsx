import { FormsType } from "@/types/forms"
import { Button } from "@/ui/design-system/button/Button"
import { ButtonLink } from "@/ui/design-system/button/ButtonLink"
import { Input } from "@/ui/design-system/input/Input"
import { Typography } from "@/ui/design-system/typography/Typography"
import clsx from "clsx"
import { FC } from "react"

interface IForgetPasswordForm {
    form: FormsType
}

export const ForgetPasswordForm: FC<IForgetPasswordForm> = ({ form }) => {
    const { register, errors, handleSubmit, isLoading, onSubmit } = form
    const required = true
    const errorMsg = "Tu dois renseigner ce champs"
    const isAutocompleted = false
    const id = "email"
    const type = "email"
    const placeholder = "Quel est ton email?"
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-8 pb-4">
            <Input
                placeholder="Johndoe@gmail.com"
                type="email"
                id="email"
                register={register}
                errors={errors} 
                errorMsg={"Tu dois renseigner ce champ"} 
                required={required} 
                isLoading={isLoading} 
            />
            <Button fullWidth isLoading={isLoading} type="submit">Envoyer</Button>
        </form>
    )
}