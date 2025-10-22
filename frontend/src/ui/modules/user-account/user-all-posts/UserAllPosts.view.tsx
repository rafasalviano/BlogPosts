import { Box } from "@/ui/design-system/box/Box";
import { Button } from "@/ui/design-system/button/Button";
import { Typography } from "@/ui/design-system/typography/Typography";
import Link from "next/link";

type ApiPost = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
};

interface IUserAllPostsViewProps {
  posts: ApiPost[];
  router: any;
  onMeasure: () => void;
  onPagination: () => void;
  onSeed: () => void;
  onDeleteAll: () => void;

  uncompressed: number | null;
  compressed: number | null;
  percentSaved: string | null;
  whUncompressed: number | null;
  whCompressed: number | null;
  whSaved: string | null;

  unpaginated: number | null;
  paginated: number | null;
  percentSavedPag: string | null;
  whUnpaginated: number | null;
  whPaginated: number | null;
  whSavedPag: string | null;
}

export const UserAllPostsView = ({
  posts,
  router,
  onMeasure,
  onPagination,
  onSeed,
  onDeleteAll,
  uncompressed,
  compressed,
  percentSaved,
  whUncompressed,
  whCompressed,
  whSaved,
  unpaginated,
  paginated,
  percentSavedPag,
  whUnpaginated,
  whPaginated,
  whSavedPag,
}: IUserAllPostsViewProps) => {

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
    <div className="p-9 flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <Typography className="text-gray-900 mb-10" variant="h4">Medição tela</Typography>
        <Typography variant="caption-1" theme="gray">Você tem {posts.length} posts</Typography>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5">
          <Button action={onSeed}>Crie 500 posts</Button>
          <Button variant="danger" action={onDeleteAll}>Delete todos os posts</Button>
        </div>
        <div className="flex flex-row gap-2">
          <Button size="small" variant="secondary" action={onMeasure}>⚡️ Efeito compressão</Button>
          <Button size="small" variant="secondary" action={onPagination}>⚡️ Efeito paginação</Button>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button size="small" variant="outline" action={() => router.reload()}>❌ Apagar anotações</Button>
      </div>

      {uncompressed !== null && compressed !== null && (
        <div className="flex flex-col items-start text-sm text-gray-700 space-y-2 text-center p-5">
          <Typography theme="black" variant="body-sm">
            <strong>Sem compressão:</strong> {uncompressed.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Com compressão:</strong> {compressed.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Redução:</strong> {percentSaved}% menor
          </Typography>
          <hr className="my-2" />
          <Typography theme="black" variant="body-sm"><strong>Energia estimada:</strong></Typography>
          <Typography theme="black" variant="body-sm">• Sem compressão: {whUncompressed?.toFixed(2)} Wh</Typography>
          <Typography theme="black" variant="body-sm">• Com compressão: {whCompressed?.toFixed(2)} Wh</Typography>
          <Button variant="outline"><strong>Economia:</strong> {whSaved} Wh</Button>
        </div>
      )}

      {unpaginated !== null && paginated !== null && (
        <div className="flex flex-col items-start text-sm text-gray-700 space-y-2 text-center p-5 border-t">
          <Typography theme="black" variant="body-sm">
            <strong>Sem paginação:</strong> {unpaginated.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Com paginação (25 posts):</strong> {paginated.toLocaleString()} bytes
          </Typography>
          <Typography theme="black" variant="body-sm">
            <strong>Redução:</strong> {percentSavedPag}% menor
          </Typography>
          <hr className="my-2" />
          <Typography theme="black" variant="body-sm"><strong>Energia estimada:</strong></Typography>
          <Typography theme="black" variant="body-sm">• Sem paginação: {whUnpaginated?.toFixed(2)} Wh</Typography>
          <Typography theme="black" variant="body-sm">• Com paginação: {whPaginated?.toFixed(2)} Wh</Typography>
          <div className="flex items-center gap-3">
            <Button variant="outline"><strong>Economia:</strong> {whSavedPag} Wh</Button>
            <a href={"/meu-espaco/post/paginado"} target="_blank" className="underline">Clique aqui para ver a paginação</a>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {posts.map(post => (
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
