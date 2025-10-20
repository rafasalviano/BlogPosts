
import React, { useMemo, useState } from "react";
import { Search, FileSpreadsheet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// This file is a SAFE, STANDALONE MOCK to **simulate your layout** without calling your API.
// It mirrors the structure, spacing, and interactive feel of your SearchEngine component.
// You can tweak it visually without touching production code.

// ---- Fake dataset just for the preview ----
const FAKE_ROWS = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  numero: `000${i + 1}-45.2025.8.26.0100`,
  valor: (Math.random() * 50000 + 1000).toFixed(2),
  dataAjuizamento: new Date(2024, 8, i + 1).toLocaleDateString(),
  dataHoraUltimaAtualizacao: new Date(2025, 0, 20 + i).toLocaleString(),
}));

function FakeResults({ page }: { page: number }) {
  return (
    <div className="divide-y rounded-2xl border shadow-sm">
      {FAKE_ROWS.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-5 sm:items-center"
        >
          <div className="font-medium">{row.numero}</div>
          <div className="text-sm opacity-80">Valor: R$ {row.valor}</div>
          <div className="text-sm opacity-80">
            Ajuizamento: {row.dataAjuizamento}
          </div>
          <div className="text-sm opacity-80 sm:col-span-2">
            Última atualização: {row.dataHoraUltimaAtualizacao}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PreviewSearchEngine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dataHoraUltimaAtualizacao");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  const title = useMemo(
    () => (searchTerm ? `Resultados para “${searchTerm}”` : "Resultados"),
    [searchTerm]
  );

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-8">
      <h1 className="mb-6 text-3xl font-bold">Mecanismo de Busca de Processos Legais</h1>

      {/* Form */}
      <form
        className="mb-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          setError("");
          // Fake a short loading time just for the preview
          setTimeout(() => setIsLoading(false), 600);
          setPage(1);
        }}
      >
        <Input
          type="text"
          placeholder="Digite o número do processo ou termo de busca"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dataHoraUltimaAtualizacao">Data de Atualização</SelectItem>
              <SelectItem value="numericValor">Valor</SelectItem>
              <SelectItem value="dataAjuizamento">Data de Ajuizamento</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={(v) => setSortOrder(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Crescente</SelectItem>
              <SelectItem value="desc">Decrescente</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              <Search className="mr-2 h-4 w-4" /> {isLoading ? "Buscando..." : "Buscar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading || isDownloading}
              onClick={() => {
                setIsDownloading(true);
                setTimeout(() => setIsDownloading(false), 800);
              }}
              className="gap-2"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="h-4 w-4" />
              )}
              {isDownloading ? "Baixando..." : "Baixar planilha"}
            </Button>
          </div>
        </div>
      </form>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      <div className="space-y-3">
        <div className="text-lg font-semibold">{title}</div>
        {!isLoading ? (
          <FakeResults page={page} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border py-16 shadow-sm">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Carregando...
          </div>
        )}

        {/* Pager */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || isLoading}>
            Anterior
          </Button>
          <span className="py-2">Página {page} de 9</span>
          <Button onClick={() => setPage((p) => Math.min(9, p + 1))} disabled={page === 9 || isLoading}>
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
