import { SessionStatusTypes } from "@/constants/session-status-types";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/Seo";
import { UserAllPostsContainer } from "@/ui/modules/user-account/user-all-posts/UserAllPosts.container";
import { UserMedicaoLocalContainer } from "@/ui/modules/user-account/user-medicao-local/UserMedicaoLocal.container";
import { GetServerSideProps } from "next";

type ApiPost = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

interface IPostsPageProps {
  posts: ApiPost[];
}

export default function MedicaoLocal({ posts }: IPostsPageProps) {
  return (
    <>
      <Layout withSidebar  sessionStatus={SessionStatusTypes.REGISTERED}><UserMedicaoLocalContainer posts={posts} /></Layout>
      <Seo
          title="Meu post"
          description="Créer un nouveau post"
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  console.time("api-post");

  try {
    const base = process.env.API_BASE_URL || "http://127.0.0.1:5027";
    const res = await fetch(`${base}/api/post`);

    console.timeEnd("api-post");

    if (!res.ok) {
      console.error("API returned status:", res.status);
      return { props: { posts: [] } };
    }

    const posts_oldest_first: ApiPost[] = await res.json();
    const posts = posts_oldest_first.reverse();

    return { props: { posts } };

  } catch (err) {
    console.timeEnd("api-post");
    console.error("SSR fetch failed:", err);
    return { props: { posts: [] } };
  }
};