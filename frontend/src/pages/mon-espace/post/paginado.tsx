import { SessionStatusTypes } from "@/constants/session-status-types";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/Seo";
import { UserAllPostsPagContainer } from "@/ui/modules/user-account/user-all-posts/UserAllPagPosts.container";
import { UserAllPostsContainer } from "@/ui/modules/user-account/user-all-posts/UserAllPosts.container";
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

export default function PostsPage({ posts }: IPostsPageProps) {
  return (
    <>
      <Layout withSidebar  sessionStatus={SessionStatusTypes.REGISTERED}><UserAllPostsPagContainer posts={posts} /></Layout>
      <Seo
          title="Meu post"
          description="Créer un nouveau post"
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const base = process.env.API_BASE_URL || "http://localhost:5027";

  const res = await fetch(`${base}/api/post/paginated?page=1&take=25`);
  if (!res.ok) {
    return { props: { posts: [] } };
  }

  const posts_oldest_first: ApiPost[] = await res.json();
  const posts = posts_oldest_first.reverse()
  return { props: { posts } };
};
