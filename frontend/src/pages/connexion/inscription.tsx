import { SessionStatusTypes } from "@/constants/session-status-types";
import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/Seo";
import { Typography } from "@/ui/design-system/typography/Typography";
import { RegisterContainer } from "@/ui/modules/authentication/register/Register.container";

export default function Inscription() {
    return (
        <>
            <Seo title="Inscription sur Coder Monkeys" description="Page d'inscription" />
            <Layout sessionStatus={SessionStatusTypes.GUEST}>
                <RegisterContainer />
            </Layout>
        </>
    )
}