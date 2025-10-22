import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { UserAllPostsView } from "./UserAllPosts.view";

type ApiPost = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

interface IUserAllPostsContainerProps {
  posts: ApiPost[];
}

// Energy constant: ~0.05 kWh/GB = 50 Wh/GB
// https://www.researchgate.net/publication/266968255_The_Energy_Intensity_of_the_Internet_Edge_and_Core_Networks
const WH_PER_GB = 50 * 1000; // Wh per GB

export const UserAllPostsContainer = ({ posts }: IUserAllPostsContainerProps) => {
  const router = useRouter();

  // Estados e controle
  const [unpaginated, setUnpaginated] = useState<number | null>(null);
  const [paginated, setPaginated] = useState<number | null>(null);
  const [loadingPagination, setLoadingPagination] = useState(false);

  const [isSeeding, setIsSeeding] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  const [uncompressed, setUncompressed] = useState<number | null>(null);
  const [compressed, setCompressed] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Efeito da paginação ---
  const handlePaginationEffect = useCallback(async () => {
    setLoadingPagination(true);
    setUnpaginated(null);
    setPaginated(null);

    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";

    try {
      const res1 = await fetch(`${base}/api/post`);
      const blob1 = await res1.blob();
      setUnpaginated(blob1.size);

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

  // --- Efeito da compressão ---
  const handleMeasure = useCallback(async () => {
    setLoading(true);
    setUncompressed(null);
    setCompressed(null);

    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";

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

  // --- Cálculos ---
  const ratio =
    uncompressed && compressed ? ((compressed / uncompressed) * 100).toFixed(1) : null;
  const whUncompressed =
    uncompressed !== null ? (uncompressed / 1e9) * WH_PER_GB : null;
  const whCompressed =
    compressed !== null ? (compressed / 1e9) * WH_PER_GB : null;
  const whSaved =
    whUncompressed && whCompressed
      ? (whUncompressed - whCompressed).toFixed(2)
      : null;
  const percentSaved =
    ratio !== null ? (100 - parseFloat(ratio)).toFixed(1) : null;

  const ratioPag =
    unpaginated && paginated ? ((paginated / unpaginated) * 100).toFixed(1) : null;
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

  // --- Seed e Delete ---
  const handleSeed = useCallback(async () => {
    const yes = window.confirm("Você deseja criar 500 posts no banco de dados?");
    if (!yes) return;

    try {
      setIsSeeding(true);
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/seed`, { method: "POST" });

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
      router.reload();
    }
  }, [router]);

  const handleDeleteAll = useCallback(async () => {
    const yes = window.confirm("Tem certeza que deseja deletar TODOS os posts?");
    if (!yes) return;

    try {
      setIsDeletingAll(true);
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5027";
      const res = await fetch(`${base}/api/post/all`, { method: "DELETE" });

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
      router.reload();
    }
  }, [router]);

  // --- Renderiza a View e repassa todos os dados e ações ---
  return (
    <UserAllPostsView
      posts={posts}
      router={router}
      onMeasure={handleMeasure}
      onPagination={handlePaginationEffect}
      onSeed={handleSeed}
      onDeleteAll={handleDeleteAll}
      uncompressed={uncompressed}
      compressed={compressed}
      percentSaved={percentSaved}
      whUncompressed={whUncompressed}
      whCompressed={whCompressed}
      whSaved={whSaved}
      unpaginated={unpaginated}
      paginated={paginated}
      percentSavedPag={percentSavedPag}
      whUnpaginated={whUnpaginated}
      whPaginated={whPaginated}
      whSavedPag={whSavedPag}
    />
  );
};