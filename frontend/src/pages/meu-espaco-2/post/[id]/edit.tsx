// pages/post/[id]/edit.tsx
import { GetServerSideProps } from "next";
import { UserEditPostContainer } from "@/ui/modules/user-account/user-edit-post/UserEditPost.container";
import { Seo } from "@/ui/components/seo/Seo";
import { Layout } from "@/ui/components/layout/layout";
import { SessionStatusTypes } from "@/constants/session-status-types";

type ApiPost = { id?: string; Id?: string; title?: string; content?: string };
export type FormPost = { id?: string; post_title: string; post: string };

export default function EditPostPage({ post }: { post: FormPost }) {
  return (
    <>
      <Layout withSidebar  sessionStatus={SessionStatusTypes.REGISTERED}><UserEditPostContainer post={post} /></Layout>
      <Seo
          title="Edit post"
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

  const api: ApiPost = await res.json();
  const post: FormPost = {
    id: api.id ?? api.Id,
    post_title: api.title ?? "",
    post: api.content ?? "",
  };

  return { props: { post } };
};
