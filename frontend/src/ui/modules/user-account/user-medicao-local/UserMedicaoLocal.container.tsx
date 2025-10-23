import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { UserMedicaoLocalView } from "./UserMedicaoLocal.view";
import { useRouter } from "next/router";

type ApiPost = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

interface IUserMedicaoLocalContainerProps {
  posts: ApiPost[];
}

type TestResult = {
  scenario: string;
  csv: string;
};

export const UserMedicaoLocalContainer = ({ posts }: IUserMedicaoLocalContainerProps) => {
  const router = useRouter()
  const [status, setStatus] = useState("Inativo");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);

  const tests = ["paginacao", "sempaginacao", "comprimido", "semcompressao"];

  const runAllTests = async () => {
    setResults([]);
    setIsRunning(true);

    for (const t of tests) {
      setStatus(` ✏️ Executando o teste ${t} ...`);

      try {
        const res = await fetch("http://localhost:5027/api/metrics/measure", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scenario: t }),
        });

        const data = await res.json();
        setResults((prev) => [...prev, { scenario: t, csv: data.csvFile }]);
        setStatus(` ✅ ${t} Finalizado`);
        toast.success(`Teste ${t} finalizado`);
      } catch (err) {
        console.error(err);
        toast.error(`Erro ao executar o teste ${t}`);
        setStatus(`❌ Erro ao executar o teste ${t}`);
      }
    }

    setStatus(" ✅ Todos os testes foram finalizados!");
    setIsRunning(false);
  };

  const runSingleTest = async (scenario: string) => {
    setStatus(` ✏️ Executanto o teste ${scenario}...`);
    setIsRunning(true);

    try {
      const res = await fetch("http://localhost:5027/api/metrics/measure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario }),
      });

      const data = await res.json();
      setResults((prev) => [...prev, { scenario, csv: data.csvFile }]);
      setStatus(` ✅ Teste ${scenario} finalizado`);
      toast.success(`Teste ${scenario} finalizado`);
    } catch (err) {
      console.error(err);
      toast.error(`Erro executando o teste ${scenario}`);
      setStatus(`❌ Erro executando ${scenario}`);
    }

    setIsRunning(false);
  };

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
      toast.success(data.message || "500 posts foram criados com sucesso.");
    } catch (e: any) {
      toast.error(e?.message ?? "Falha em criar posts");
    } finally {
      setIsSeeding(false);
      router.reload();
    }
  }, [router]);

  const formatCreatedAt = ({ createdAt }: ApiPost) => {
    const createdAtFormat = createdAt
      ?.replace(/-|T/g, match => (match === "-" ? " / " : " at "))
      .slice(0, 23);
    if (createdAtFormat) {
      let hourChars = parseInt(createdAtFormat.slice(18, 20)) - 3;
      if (hourChars < 0) hourChars = hourChars + 24;
      let hourCharsConv = String(hourChars);
      let charArray = createdAtFormat.split("");
      charArray[18] = hourCharsConv.split("")[0];
      charArray[19] = hourCharsConv.split("")[1];
      hourCharsConv = String(charArray).replace(/,/g, "");
      return hourCharsConv;
    }
  };

  return (
    <UserMedicaoLocalView
      posts={posts}
      status={status}
      results={results}
      isRunning={isRunning}
      runAllTests={runAllTests}
      runSingleTest={runSingleTest}
      onSeed={handleSeed}
      formatCreatedAt={formatCreatedAt}
    />
  );
};