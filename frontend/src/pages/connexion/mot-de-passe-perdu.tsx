import { SessionStatusTypes } from "@/constants/session-status-types";
import { Seo } from "@/ui/components/seo/Seo";
import { ForgetPasswordContainer } from "@/ui/modules/authentication/forget-password/ForgetPassword.container";
import { Layout } from "@/ui/components/layout/layout";

export default function ForgetPassword() {
    return(
        <>
            <Seo title="Mot de passe perdu sur Coder Monkeys" description="Page de récupération de mot de passe" />
            <Layout  sessionStatus={SessionStatusTypes.GUEST}>
                <ForgetPasswordContainer />
            </Layout>
        </>
    )
}