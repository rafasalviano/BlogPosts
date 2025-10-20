import Link from "next/link";
import { UserAllPostsView } from "./UserAllPosts.view";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type ApiPost = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

interface IUserAllPostsContainerProps {
  posts: ApiPost[];
}

export const UserAllPostsContainer = ({ posts }: IUserAllPostsContainerProps) => {
  return <UserAllPostsView posts={posts}/>
};
