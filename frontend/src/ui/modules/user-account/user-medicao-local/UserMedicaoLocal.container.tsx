import { useState } from "react";
import { toast } from "react-toastify";
import { UserMedicaoLocalView } from "./UserMedicaoLocal.view";

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
  const [status, setStatus] = useState("Inativo");
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const tests = ["paginacao", "sempaginacao", "comprimido", "padrao"];

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

  return (
    <UserMedicaoLocalView
      posts={posts}
      status={status}
      results={results}
      isRunning={isRunning}
      runAllTests={runAllTests}
      runSingleTest={runSingleTest}
    />
  );
};