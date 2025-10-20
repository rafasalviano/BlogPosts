import { FC, useState } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { UserEditPostView } from "./UserEditPost.view";

export type FormPost = { id?: string; post_title: string; post: string };

interface IUserEditPostContainerProps {
  post: FormPost;
}

export const UserEditPostContainer: FC<IUserEditPostContainerProps> = ({ post }) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormPost>({
    defaultValues: post,
  });

  const onSubmit: SubmitHandler<FormPost> = async (data) => {
    if (!post.id) {
      toast.error("Missing post id.");
      return;
    }
    try {
      setIsSaving(true);
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: data.post_title, content: data.post }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      toast.success("Post updated!");
      router.push(`/meu-espaco/post/${post.id}`);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to update post");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <UserEditPostView
      form={{
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading: isSaving,
      }}
    />
  );
};