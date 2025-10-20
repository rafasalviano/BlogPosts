import { FC } from "react";
import { NewPostFormFieldsType } from "@/types/forms";
import { UserPostView } from "./UserPost.view";

interface IUserPostContainerProps {
  post: NewPostFormFieldsType;
}

export const UserPostContainer: FC<IUserPostContainerProps> = ({ post }) => {
  if (!post) return <div>Not found</div>;

  return <UserPostView post={post}/>
};