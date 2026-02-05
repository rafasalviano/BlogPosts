import { SessionStatusTypes } from "@/constants/session-status-types";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/Seo";
import { UserAccountContainer } from "@/ui/modules/user-account/user-profile/UserAccount.container";

export default function MonEspace() {
    return (
        <>
            <Layout withSidebar  sessionStatus={SessionStatusTypes.REGISTERED}><UserAccountContainer/></Layout>
            <Seo
                title="Mon espace"
                description="Description de la page"
            />
        </>
    )
}