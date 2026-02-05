import { SessionStatusTypes } from "@/constants/session-status-types";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/Seo";
import { UserNewPostContainer } from "@/ui/modules/user-account/user-new-post/UserNewPost.container";

export default function NouveauPost() {
    return (
        <>
            <Layout withSidebar  sessionStatus={SessionStatusTypes.REGISTERED}><UserNewPostContainer/ ></Layout>
            <Seo
                title="Nouveau Post"
                description="Créer un nouveau post"
            />
        </>
    )
}