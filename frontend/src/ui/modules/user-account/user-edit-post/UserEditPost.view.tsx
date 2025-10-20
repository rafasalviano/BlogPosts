import { FC } from "react";
import { FormsType } from "@/types/forms";
import { Container } from "@/ui/components/container/Container";
import { Box } from "@/ui/design-system/box/Box";
import { Typography } from "@/ui/design-system/typography/Typography";
import Link from "next/link";
import { UserEditPostForm } from "./UserEditPost.form";

interface IUserEditPostViewProps {
  form: FormsType;
}

export const UserEditPostView: FC<IUserEditPostViewProps> = ({ form }) => {
  return (
    <Container className="grid grid-cols-4 gap-20 mb-20 items-center">
      <div className="col-span-4 mb-10">
        <Box>
          <div className="flex items-center justify-between">
              <Typography className="text-gray-700" variant="h5">
                  Editar post
              </Typography>
              <div className="flex items-cente gap-2">
                  <Typography variant="caption-3">
                      Tu veux voir la liste de tes posts precedents?
                  </Typography>
                  <Typography theme="primary" variant="caption-3">
                      <Link href="/meu-espaco/post">
                          Mes posts
                      </Link>
                  </Typography>
              </div>
          </div>
          <UserEditPostForm form={form} />
        </Box>
      </div>
    </Container>
  );
};