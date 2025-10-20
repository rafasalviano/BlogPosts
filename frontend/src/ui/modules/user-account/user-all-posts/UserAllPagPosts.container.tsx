"use client";

import { useState, useCallback, useEffect } from "react";
import { Box } from "@/ui/design-system/box/Box";
import { Button } from "@/ui/design-system/button/Button";
import { Typography } from "@/ui/design-system/typography/Typography";
import Link from "next/link";
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

export const UserAllPostsPagContainer = ({ posts }: IUserAllPostsContainerProps) => {
  const [page, setPage] = useState(1);
  const [pagedPosts, setPagedPosts] = useState<ApiPost[]>(posts);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [totalPosts, setTotalPosts] = useState<number | null>(null);

  const handlePageChange = useCallback(async (newPage: number) => {
    setIsLoadingPage(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/paginated?page=${newPage}&take=25`);
      if (!res.ok) throw new Error("Erro ao buscar posts paginados.");
      const data = await res.json();
      setPagedPosts(data);
      setPage(newPage);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar página.");
    } finally {
      setIsLoadingPage(false);
    }
  }, []);

  const fetchTotalCount = useCallback(async () => {
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/all`);
      if (!res.ok) return;
      const data: ApiPost[] = await res.json();
      setTotalPosts(data.length);
    } catch {
      console.warn("Não foi possível contar o total de posts.");
    }
  }, []);

  useEffect(() => {
    fetchTotalCount();
  }, [fetchTotalCount]);

  const formatCreatedAt = ({ createdAt }: ApiPost) => {
    const createdAtFormat = createdAt?.replace(/-|T/g, match => match === '-' ? ' / ' : ' at ').slice(0, 23);
    if (createdAtFormat) {
      let hourChars = parseInt(createdAtFormat.slice(18, 20)) - 3;
      if (hourChars < 0) hourChars += 24;
      let hourCharsConv = String(hourChars);
      const charArray = createdAtFormat.split("");
      charArray[18] = hourCharsConv.split("")[0];
      charArray[19] = hourCharsConv.split("")[1];
      hourCharsConv = String(charArray).replace(/,/g, "");
      return hourCharsConv;
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <Typography className="text-gray-900 mb-6" variant="h4">
          Postagens com Paginação
        </Typography>
        {totalPosts !== null && (
          <Typography variant="caption-1" theme="gray">
            Exibindo {pagedPosts.length} de {totalPosts} posts
          </Typography>
        )}
      </div>

      {/* Lista de posts */}
      <ul className="space-y-2">
        {pagedPosts.map((post) => (
          <Box key={post.id} className="p-4 border rounded hover:bg-gray-50 transition">
            <Link href={`/meu-espaco/post/${post.id}`}>
              <div className="flex flex-row justify-between">
                <Typography theme="primary" variant="body-base">{post.title}</Typography>
                <Typography theme="gray" variant="body-sm">
                  {post.createdAt && formatCreatedAt(post)}
                </Typography>
              </div>
              <Typography className="text-gray-700" variant="body-sm">
                {post.content}
              </Typography>
            </Link>
          </Box>
        ))}
      </ul>

      {/* Controles de Paginação */}
      <div className="flex flex-row justify-center gap-4 mt-6 items-center">
        <Button
          size="small"
          variant="secondary"
          disabled={page === 1 || isLoadingPage}
          action={() => handlePageChange(page - 1)}
        >
          ◀️ Anterior
        </Button>

        <Typography variant="body-sm" theme="gray">
          Página {page}
        </Typography>

        <Button
          size="small"
          variant="secondary"
          disabled={pagedPosts.length < 25 || isLoadingPage}
          action={() => handlePageChange(page + 1)}
        >
          Próximo ▶️
        </Button>
      </div>

      {isLoadingPage && (
        <Typography className="text-center text-gray-500 mt-2" variant="body-sm">
          Carregando página...
        </Typography>
      )}
    </div>
  );
};