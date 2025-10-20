import { SessionStatusTypes } from "@/constants/session-status-types";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/Seo";
import { LoginContainer } from "@/ui/modules/authentication/login/Login.container";

export default function Connexion() {
    return (
        <>
            <Seo title="Connexion sur Coder Monkeys" description="Page de connexion" />
            <Layout sessionStatus={SessionStatusTypes.GUEST}>
                <LoginContainer />
            </Layout>
        </>
    )
}