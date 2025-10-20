import { Layout } from "@/ui/components/layout/layout";
import { Seo } from "@/ui/components/seo/Seo";

export default function Onboarding () {
    return (
        <><
            Seo title={"Mon espace"} description={"Description de la page de onboarding"} />
            <Layout>
                <div className="flex items-center justify-center px-20 py-40">
                    Welcome to onboarding
                </div>
            </Layout>
        </>
    )
}