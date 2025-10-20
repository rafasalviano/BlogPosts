import {Inter} from "next/font/google";
import {Seo} from "@/ui/components/seo/Seo";
import { Typography } from "@/ui/design-system/typography/Typography";
import { Button } from "@/ui/design-system/button/Button";
import { RiUser6Fill } from "react-icons/ri";
import { Logo } from "@/ui/design-system/logo/Logo";
import { Container } from "@/ui/components/container/Container";
import { ActiveLink } from "@/ui/components/navigation/Active-link";
import { Navigation } from "@/ui/components/navigation/Navigation";
import { Footer } from "@/ui/components/navigation/Footer";
import { Layout } from "@/ui/components/layout/layout";
import { LandingPageView } from "@/ui/modules/landing-page/Landing-page.view";
import { LandingPageContainer } from "@/ui/modules/landing-page/Landing-page.container";
import { SessionStatusTypes } from "@/constants/session-status-types";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <>
        <Seo title="Coders Monkeys" description="Description..." />
          <Layout  sessionStatus={SessionStatusTypes.GUEST}><LandingPageContainer /></Layout>
      </>
  );
}


// Ctrl + opt + O imports