import { ForgetPasswordFormFieldsType } from "@/types/forms"
import { ForgetPasswordView } from "./ForgetPassword.view"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useToggle } from "@/hooks/use-toggle"
import { useRouter } from "next/router"
import { firebaseResetPassword } from "@/api/Authentication"
import { toast } from "react-toastify"


export const ForgetPasswordContainer = () => {
    const router = useRouter()
    const {value: isLoading, setValue: setIsLoading} = useToggle()
    const{setError, handleSubmit, formState: {errors}, register, reset} = useForm<ForgetPasswordFormFieldsType>()
    
    const handleResetPassword = async ({email}:ForgetPasswordFormFieldsType) => {
        const {error} = await firebaseResetPassword(email)
        setIsLoading(false)
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success(`Si votre addresse ${email} est correcte, vous recevrez bientôt un e-mail`)
        router.push("/connexion")
    }

    const onSubmit: SubmitHandler<ForgetPasswordFormFieldsType> = async (formData) => {
        console.log("formData", formData)
        setIsLoading(true)
        handleResetPassword(formData)
    }

    return (
        <><ForgetPasswordView form={{handleSubmit, errors, register, isLoading, onSubmit}}/></>
    )
}