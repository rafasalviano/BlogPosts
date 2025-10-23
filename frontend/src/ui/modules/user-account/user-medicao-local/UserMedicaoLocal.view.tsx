import { Box } from "@/ui/design-system/box/Box";
import { Button } from "@/ui/design-system/button/Button";
import { Typography } from "@/ui/design-system/typography/Typography";
import Link from "next/link";
import React from "react";

type TestResult = {
  scenario: string;
  csv: string;
};

type ApiPost = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

interface IUserMedicaoLocalViewProps {
  posts: ApiPost[];
  status: string;
  isRunning: boolean;
  onSeed: () => {};
  results: TestResult[];
  runAllTests: () => void;
  runSingleTest: (scenario: string) => void;
  formatCreatedAt: (post: ApiPost) => string | undefined;
}

export const UserMedicaoLocalView = ({
  posts,
  status,
  isRunning,
  onSeed,
  results,
  runAllTests,
  runSingleTest,
  formatCreatedAt
}: IUserMedicaoLocalViewProps) => {
    if (!posts || posts.length === 0) {
    return (
      <div>
        <Button action={onSeed}>Crie 500 posts</Button>
        <div className="p-6 text-center text-gray-600">
          Você ainda não fez nenhum post ✨
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="p-9 flex flex-col gap-2">
        <Typography className="text-gray-900 mb-10" variant="h4"> Medição Local de Energia</Typography>
        <Typography theme="gray" weight="medium" variant="body-lg">Status atual: {status}</Typography>
      
        <div className="flex flex-col gap-5 mt-3 mb-8">
          <Button variant="success" action={runAllTests} disabled={isRunning}>
            Meça as 4 variações
          </Button>{" "}
          <div className="flex w-full gap-2 items-center">
            <Button action={() => runSingleTest("paginacao")} disabled={isRunning} className="w-full">
              Com paginação
            </Button>{" x "}
            <Button action={() => runSingleTest("sempaginacao")} disabled={isRunning} className="w-full">
              Sem paginação
            </Button>{" "}
          </div>
          <div className="flex gap-2 items-center">
            <Button action={() => runSingleTest("comprimido")} disabled={isRunning} className="w-full">
              Comprimido
            </Button>{" x "}
            <Button action={() => runSingleTest("semcompressao")} disabled={isRunning} className="w-full">
              Sem compressão
            </Button>
          </div>
        </div>
      
        <div className="grid grid-cols-2">
          <Typography variant="body-base" className="p-3" weight="medium">Cenário</Typography>
          <Typography variant="body-base" className="p-3" weight="medium">CSV salvo em</Typography>
          {results.map((r) => (
            <React.Fragment key={r.scenario}>
              <Typography variant="body-base" className="p-3">{r.scenario}</Typography>
              <div className="p-3 break-all">
                <code>{r.csv}</code>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="p-9 flex flex-col gap-4">
  <Typography variant="caption-1" theme="gray">
    Você tem {posts.length} posts
  </Typography>

  <ul className="space-y-2 list-none">
    {posts.map((post) => (
      <li key={post.id}>
        <Box className="p-4 border rounded hover:bg-gray-50">
          <Link href={`/meu-espaco/post/${post.id}`}>
            <div className="flex flex-row justify-between">
              <Typography theme="primary" variant="body-base">
                {post.title}
              </Typography>

              <Typography theme="gray" variant="body-sm">
                {post.createdAt && formatCreatedAt(post)}
              </Typography>
            </div>

            <Typography className="text-gray-700" variant="body-sm">
              {post.content}
            </Typography>
          </Link>
        </Box>
      </li>
    ))}
  </ul>
</div>

    </>
  );
};

/*
      <table className=" p-6">
        <thead>
          <tr>
            <th>Cenário</th>
            <th>CSV salvo em</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.scenario}>
              <td>{r.scenario}</td>
              <td>
                <code>{r.csv}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      */
