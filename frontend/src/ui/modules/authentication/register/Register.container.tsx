import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterView } from "./Register.view";
import { RegisterFormFieldsType } from "@/types/forms";
import { useState } from "react";
import { useToggle } from "@/hooks/use-toggle";
import { firebaseCreateUser, firebaseEmailVerification } from "@/api/Authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { firestoreCreateDocument } from "@/api/Firestore";
import { sendEmailVerification } from "firebase/auth";


export const RegisterContainer = () => {
  const {value: isLoading, setValue: setIsLoading} = useToggle();
  const router = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    reset,
  } = useForm<RegisterFormFieldsType>();

  // const hCUA  → turn it off, show error, show success message. async fun returns an object

  const handleCreateUserAuthenticate = async ({email, password, how_did_hear}: RegisterFormFieldsType) => {
      const {data, error} = await firebaseCreateUser(email, password) // I want data = userCredentials.user for document
      setIsLoading(false)
      if (error) {
        toast.error(error.message)
        return;
      }
      
      const userDocumentData = {
        email: email,
        how_did_hear: how_did_hear,
        uid: data.uid, // comes from firebaseCreateUser data returned is userCredentials.user now ...user.uid
        creation_date: new Date()
      }
      handleCreateUserDocument("users", data.uid, userDocumentData)
      
    }
    
    const handleCreateUserDocument = async (collectionName: string, documentID: string, document: object) => {
      const {error} = await firestoreCreateDocument(collectionName, documentID, document)
      setIsLoading(false)
      if (error) {
        toast.error(error.message)
        return;
      }
      toast.success("Bienvenue sur l'app des singes codeurs")
      router.push("/connexion")
      reset()
      firebaseEmailVerification()
  }

  const onSubmit: SubmitHandler<RegisterFormFieldsType> = async (formData) => {
    setIsLoading(true);
    console.log("formData", formData);
    const {password} = formData
    if (password.length < 4) {
      setError("password",{type: "manual", message: "Ton mot de passe doit comporter au minimum 6 caractères"})
      setIsLoading(false);
      return
    }
    handleCreateUserAuthenticate(formData)
  };

  return (
    <RegisterView
      form={{
        errors,
        register,
        handleSubmit,
        onSubmit,
        isLoading,
      }}
    />
  );
};