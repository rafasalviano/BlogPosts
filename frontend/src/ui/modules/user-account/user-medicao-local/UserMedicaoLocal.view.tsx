import { Button } from "@/ui/design-system/button/Button";
import { Typography } from "@/ui/design-system/typography/Typography";

type TestResult = {
  scenario: string;
  csv: string;
};

interface IUserMedicaoLocalViewProps {
  posts: { id?: string; title?: string; content?: string; createdAt?: string }[];
  status: string;
  isRunning: boolean;
  results: TestResult[];
  runAllTests: () => void;
  runSingleTest: (scenario: string) => void;
}

export const UserMedicaoLocalView = ({
  posts,
  status,
  isRunning,
  results,
  runAllTests,
  runSingleTest,
}: IUserMedicaoLocalViewProps) => {
  return (
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
          <Button action={() => runSingleTest("padrao")} disabled={isRunning} className="w-full">
            Sem compressão
          </Button>
        </div>
      </div>

      <table border={1} cellPadding={6}>
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
    </div>
  );
};