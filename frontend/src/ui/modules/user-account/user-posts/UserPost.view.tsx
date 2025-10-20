// src/ui/modules/user-account/user-posts/UserPost.container.tsx (or .view.tsx if you prefer)
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { NewPostFormFieldsType } from "@/types/forms";
import { Typography } from "@/ui/design-system/typography/Typography";
import { Box } from "@/ui/design-system/box/Box";
import { Container } from "@/ui/components/container/Container";
import Link from "next/link";
import { Button } from "@/ui/design-system/button/Button"; // a normal button (not ButtonLink)
import { toast } from "react-toastify";

interface IUserPostViewProps {
  post: NewPostFormFieldsType & { id?: string };
}

export const UserPostView: FC<IUserPostViewProps> = ({ post }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!post) return <div>Not found</div>;

  const handleDelete = useCallback(async () => {
    if (!post.id) {
      toast.error("Missing post id.");
      return;
    }
    const yes = window.confirm("Delete this post? This cannot be undone.");
    if (!yes) return;

    try {
      setIsDeleting(true);
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/${post.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      toast.success("Post deleted.");
      router.push("/meu-espaco/post"); // back to list
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  }, [post?.id, router]);

  return (
    <>
      <Container className="grid grid-cols-4 gap-20 mb-20 items-center">
        <div className="col-span-4">
          <Box className="flex-row">
            <div className="flex items-center justify-end">
              <div className="flex items-cente gap-2">
                <Typography variant="caption-3">
                  Você quer ver a lista de posts completa?
                </Typography>
                <Typography theme="primary" variant="caption-3">
                  <Link href="/meu-espaco/post">Meus posts</Link>
                </Typography>
              </div>
            </div>

            <Typography variant="h5" theme="primary" className="pl-5 mt-10">
              {post.post_title}
            </Typography>

            <Box className="mt-6 py-10">
              <Typography variant="body-base" className="flex text-gray-700 justify-start pb-10">
                {post.post}
              </Typography>
            </Box>

            <div className="flex flex-row justify-end gap-3 mr-4 mt-20">
              {/* Edit: go to the edit page */}
              <Link href={`/meu-espaco/post/${post.id}/edit`} className="inline-block">
                <Button variant="secondary" size="small">Editar</Button>
              </Link>

              {/* Delete: do the fetch */}
              <Button
                variant="danger"
                size="small"
                action={handleDelete}
                isLoading={isDeleting}
              >
                Apagar
              </Button>
            </div>
          </Box>
        </div>
      </Container>
    </>
  );
};