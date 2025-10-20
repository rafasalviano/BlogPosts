import { SubmitHandler, useForm } from "react-hook-form";
import { NewPostFormFieldsType, RegisterFormFieldsType } from "@/types/forms";
import { useState } from "react";
import { useToggle } from "@/hooks/use-toggle";
import { firebaseCreateUser, firebaseEmailVerification } from "@/api/Authentication";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { firestoreCreateDocument } from "@/api/Firestore";
import { sendEmailVerification } from "firebase/auth";
import { UserNewPostView } from "./UserNewPost.view";


export const UserNewPostContainer = () => {
  const {value: isLoading, setValue: setIsLoading} = useToggle();
  const router = useRouter()
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
    reset,
  } = useForm<NewPostFormFieldsType>();

const handleCreateNewPost = async ({ post_title, post }: NewPostFormFieldsType) => {
    if (isLoading) return; // prevent double submit
    setIsLoading(true);
    
    try {
      const res = await fetch("http://localhost:5027/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: post_title, content: post }), // matches CreatePostRequest(title, post)
      });

      if (!res.ok) {
        const text = await res.text(); // reads response body as a text
        throw new Error(text || `HTTP ${res.status}`);
      }

      const created = await res.json();
      toast.success("Post created!");

      reset(); // clear the form

      // ??  “if the left side is null or undefined, use the right side instead”
      const id = created.id ?? created.Id;
      if (id) router.push(`/meu-espaco/post/${id}`);
    } catch (err: any) {
      // → tries to use the error object’s message property, if err.message is null or undefined, 
      // it falls back to the string "Failed to create post"
      toast.error(err.message ?? "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<NewPostFormFieldsType> = async (formData) => {
    setIsLoading(true);
    console.log("formData", formData);
    const {post_title} = formData
    await handleCreateNewPost(formData);
  };

  return (
    <UserNewPostView
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