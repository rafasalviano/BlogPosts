import { ActiveLink } from "@/ui/components/navigation/Active-link";
import { Box } from "@/ui/design-system/box/Box";
import { Button } from "@/ui/design-system/button/Button";
import { Typography } from "@/ui/design-system/typography/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

type ApiPost = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

interface IUserAllPostsViewProps {
  posts: ApiPost[];
}

// Energy constant: ~0.05 kWh/GB = 50 Wh/GB
// https://www.researchgate.net/publication/266968255_The_Energy_Intensity_of_the_Internet_Edge_and_Core_Networks

const WH_PER_GB = 50 * 1000; // Wh per GB


export const UserAllPostsView = ({ posts }: IUserAllPostsViewProps) => {
  const router = useRouter();

  const [unpaginated, setUnpaginated] = useState<number | null>(null);
  const [paginated, setPaginated] = useState<number | null>(null);
  const [loadingPagination, setLoadingPagination] = useState(false);

  const [isSeeding, setIsSeeding] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const [uncompressed, setUncompressed] = useState<number | null>(null);
  const [compressed, setCompressed] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);


  const handlePaginationEffect = useCallback(async () => {
    setLoadingPagination(true);
    setUnpaginated(null);
    setPaginated(null);

    const base =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";

    try {
      // Sem paginação (Getall)
      const res1 = await fetch(`${base}/api/post`);
      const blob1 = await res1.blob();
      setUnpaginated(blob1.size);

      // Paginação (page=1, take=25)
      const res2 = await fetch(`${base}/api/post/paginated?page=1&take=25`);
      const blob2 = await res2.blob();
      setPaginated(blob2.size);
    } catch (err) {
      console.error(err);
      alert("Erro ao medir efeito da paginação.");
    } finally {
      setLoadingPagination(false);
    }
  }, []);

  const handleMeasure = useCallback(async () => {
    setLoading(true);
    setUncompressed(null);
    setCompressed(null);

    const base =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";

    try {
      const res = await fetch(`${base}/api/post/compare`);
      const data = await res.json();
      setUncompressed(data.uncompressed);
      setCompressed(data.compressed);
    } catch (err) {
      console.error(err);
      alert("Erro ao medir tamanho dos dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  const ratio =
    uncompressed && compressed
      ? ((compressed / uncompressed) * 100).toFixed(1)
      : null;
  const whUncompressed =
    uncompressed !== null ? (uncompressed / 1e9) * WH_PER_GB : null;
  const whCompressed =
    compressed !== null ? (compressed / 1e9) * WH_PER_GB : null;
  const whSaved =
    whUncompressed && whCompressed
      ? (whUncompressed - whCompressed).toFixed(2) // 2 casas, string
      : null;
  const percentSaved =
    ratio !== null ? (100 - parseFloat(ratio)).toFixed(1) : null; // de volta pra número

  const ratioPag =
  unpaginated && paginated
    ? ((paginated / unpaginated) * 100).toFixed(1)
    : null;

  const whUnpaginated =
    unpaginated !== null ? (unpaginated / 1e9) * WH_PER_GB : null;
  const whPaginated =
    paginated !== null ? (paginated / 1e9) * WH_PER_GB : null;
  const whSavedPag =
    whUnpaginated && whPaginated
      ? (whUnpaginated - whPaginated).toFixed(2)
      : null;
  const percentSavedPag =
    ratioPag !== null ? (100 - parseFloat(ratioPag)).toFixed(1) : null;

  const handleSeed = useCallback(async () => {
    const yes = window.confirm("Você deseja criar 500 posts no banco de dados?");
    if (!yes) return;

    try {
      setIsSeeding(true);
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/seed`, {
        method: "POST",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      toast.success(data.message || "500 posts created successfully.");
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to create posts");
    } finally {
      setIsSeeding(false);
      router.reload()
    }
  }, [router]);

  const handleDeleteAll = useCallback(async () => {
    const yes = window.confirm("Tem certeza que deseja deletar TODOS os posts?");
    if (!yes) return;

    try {
      setIsDeletingAll(true);
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/all`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      toast.success(data.message || "Todos os posts foram deletados.");
    } catch (e: any) {
      toast.error(e?.message ?? "Falha ao deletar posts.");
    } finally {
      setIsDeletingAll(false);
      router.reload()
    }
  }, [router]);

  if (!posts || posts.length === 0) {
    return (
      <div>
        <Button action={handleSeed}>Crie 500 posts</Button>
        <div className="p-6 text-center text-gray-600">
          Você ainda não fez nenhum post ✨
        </div>
      </div>
    );
  }
  // Forçando a barra para consertar a hora
  const formatCreatedAt = ({createdAt}:ApiPost) => {
    const createdAtFormat = createdAt?.replace(/-|T/g, match => match === '-' ? ' / ' : ' at ').slice(0, 23)
    if(createdAtFormat) {
      let hourChars = parseInt(createdAtFormat.slice(18,20)) - 3;
      if (hourChars < 0) {
        hourChars = hourChars + 24
      }
      let hourCharsConv = String(hourChars)
      let charArray = createdAtFormat.split("");
      charArray[18] = hourCharsConv.split("")[0]
      charArray[19] = hourCharsConv.split("")[1]
      hourCharsConv = String(charArray).replace(/,/g,"")
      console.log(hourCharsConv)
      return(hourCharsConv)
    }
  }
  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-row justify-between">
        <Typography className="text-gray-900 mb-10" variant="h4">Minhas Postagens</Typography>
        <Typography variant="caption-1" theme="gray" >Você tem {posts.length} posts</Typography>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5">
          <Button action={handleSeed}>Crie 500 posts</Button>
          <Button variant="danger" action={handleDeleteAll}>Delete todos os posts</Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button size="small" variant="secondary" action={handleMeasure}>⚡️ Efeito compressão</Button>
          <Button size="small" variant="secondary" action={handlePaginationEffect}>⚡️ Efeito paginação</Button>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <ActiveLink href={"/meu-espaco/post"}>❌ Apagar anotações</ActiveLink>
      </div>      
      {uncompressed !== null && compressed !== null && (
        <div className="flex flex-col items-start text-sm text-gray-700 space-y-2 text-center p-5">
          <Typography theme="black" variant="body-sm">
            <strong>Sem compressão:</strong>{" "}
            {uncompressed.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Com compressão:</strong>{" "}
            {compressed.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Redução:</strong> {percentSaved}% menor
          </Typography>
          <hr className="my-2" />
          <Typography theme="black" variant="body-sm">
            <strong>Energia estimada:</strong>
          </Typography>
          <Typography theme="black" variant="body-sm">• Sem compressão: {whUncompressed?.toFixed(2)} Wh</Typography>
          <Typography theme="black" variant="body-sm">• Com compressão: {whCompressed?.toFixed(2)} Wh</Typography>
          <Button variant="outline">
            <strong>Economia:</strong> {whSaved} Wh
          </Button>
        </div>
      )}
      {unpaginated !== null && paginated !== null && (
        <div className="flex flex-col items-start text-sm text-gray-700 space-y-2 text-center p-5 border-t">
          <Typography theme="black" variant="body-sm">
            <strong>Sem paginação:</strong>{" "}
            {unpaginated.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Com paginação (25 posts):</strong>{" "}
            {paginated.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Redução:</strong> {percentSavedPag}% menor
          </Typography>
          <hr className="my-2" />
          <Typography theme="black" variant="body-sm">
            <strong>Energia estimada:</strong>
          </Typography>
          <Typography theme="black" variant="body-sm">
            • Sem paginação: {whUnpaginated?.toFixed(2)} Wh
          </Typography>
          <Typography theme="black" variant="body-sm">
            • Com paginação: {whPaginated?.toFixed(2)} Wh
          </Typography>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <strong>Economia:</strong> {whSavedPag} Wh
            </Button>
            <a href={"/meu-espaco/post/paginado" } target="_blank" className="underline" >Clique aqui para ver a paginação</a>
          </div>
        </div>
      )}
      <ul className="space-y-2">
        {posts.map((post) => (
          <Box key={post.id} className="p-4 border rounded hover:bg-gray-50">
            <Link href={`/meu-espaco/post/${post.id}`}>
              <div className="flex flex-row justify-between">
                <Typography theme="primary" variant="body-base">{post.title}</Typography>
                <Typography theme="gray" variant="body-sm">
                  {post.createdAt && formatCreatedAt(post)}
                </Typography>
              </div>
              <Typography className="text-gray-700" variant="body-sm">{post.content}</Typography>
            </Link>
          </Box>
        ))}
      </ul>
    </div>
  );
};

                  // {post.createdAt?.replace(/-|T/g, match => match === '-' ? ' / ' : ' at ').slice(0, 23)}
