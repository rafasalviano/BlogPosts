// pages/post/[id].tsx
import { GetServerSideProps } from "next";
import { UserPostContainer } from "@/ui/modules/user-account/user-posts/UserPost.container";
import { NewPostFormFieldsType } from "@/types/forms";
import { Layout } from "@/ui/components/layout/layout";
import { SessionStatusTypes } from "@/constants/session-status-types";
import { Seo } from "@/ui/components/seo/Seo";

type ApiPost = { id?: string; title?: string; content?: string; createdAt?: string };
type UiPost = { id?: string; post_title: string; post: string };


export default function PostPage({ post }: { post: UiPost }) {
  return (
    <>
      <Layout withSidebar  sessionStatus={SessionStatusTypes.REGISTERED}><UserPostContainer post={post} /></Layout>
      <Seo
          title="Meu post"
          description="Créer un nouveau post"
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const base = process.env.API_BASE_URL || "http://localhost:5027";

  const res = await fetch(`${base}/api/post/${id}`);
  if (!res.ok) return { notFound: true };

  const apiPost: ApiPost = await res.json();

  // Map backend → UI form shape expected by UserPostContainer
  const post: UiPost = {
    id: apiPost.id,
    post_title: apiPost.title ?? "",
    post: apiPost.content ?? "",
  };

  return { props: { post } };
};





