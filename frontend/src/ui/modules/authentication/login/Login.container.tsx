import { useForm, SubmitHandler } from "react-hook-form"
import { LoginView } from "./Login.view"
import { useState } from "react"
import { LoginFormFieldsType } from "@/types/forms"
import { useToggle } from "@/hooks/use-toggle"
import { useRouter } from "next/router"
import { firebaseSignInUser } from "@/api/Authentication"
import { toast } from "react-toastify"

import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/config/firebase-config"

/*
NEW HOOK - USE EFFECT

useEffect(() => {
   ..Your side effect logic here (e.g. fetch data, subscribe, etc.)
 }, [ø]);

 DEPENDENCY ARRAY

[] → ø run function once after the initial render and that's it
[variables] → run function once after initial render and AGAIN whenever the
dependencies (aka variables) in the array change.

FIREBASE AUTH LISTENER
“Listen to auth state changes on this specific auth instance.”
*/

export const LoginContainer = () => {
    const router = useRouter()
    const {value: isLoading, setValue: setIsLoading} = useToggle()
    const {formState:{errors}, register, reset, handleSubmit, setError} = useForm<LoginFormFieldsType>()

    const handleSignInUser = async({email, password}:LoginFormFieldsType) => {
        const {error} = await firebaseSignInUser(email, password)
        setIsLoading(false)
        if (error) {
            toast.error(error.message)
            return
        }
        toast.success("Bienvenue sur Coder Monkeys")
        router.push("/meu-espaco")
    }

    const onSubmit: SubmitHandler<LoginFormFieldsType> = async (formData) => {
        setIsLoading(true)
        console.log("formData",formData)
        const {password} = formData
        if(password.length < 6) {
            setError("password",{type:"manual",message:"Ton mot de passe doit comporter au moins 6 caractères"})
        }
        handleSignInUser(formData)
    }
    return(
        <>
            <LoginView form={{isLoading, errors, register, handleSubmit, onSubmit}}/>
        </>
    )
}