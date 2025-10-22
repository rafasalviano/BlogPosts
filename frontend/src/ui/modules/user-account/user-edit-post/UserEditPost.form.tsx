import { FC } from "react";
import { FormsType } from "@/types/forms";
import { Input } from "@/ui/design-system/input/Input";
import { TextArea } from "@/ui/design-system/text-area/Text-area";
import { Button } from "@/ui/design-system/button/Button";

interface IUserEditPostFormProps {
  form: FormsType; // assumes same shape you use elsewhere: { register, errors, isLoading, onSubmit, handleSubmit }
}

export const UserEditPostForm: FC<IUserEditPostFormProps> = ({ form }) => {
  const { register, errors, isLoading, onSubmit, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-8 pb-5 space-y-4">
      <Input
        placeholder="Título"
        type="text"
        id="post_title"
        register={register}
        errors={errors}
        errorMsg="Tu dois renseigner ce champ"
        isLoading={isLoading}
        className="font-medium text-xl text-gray-800"
        autoFocus={true}
      />
      <TextArea
        placeholder="Sobre o que está pensando...?"
        type="text"
        id="post"
        register={register}
        errors={errors}
        errorMsg="Tu dois renseigner ce champ"
        isLoading={isLoading}
        className="min-h-[30rem] text-xl text-gray-800"
      />
      <Button type="submit" fullWidth isLoading={isLoading}>
        Enregistrer les modifications
      </Button>
    </form>
  );
};