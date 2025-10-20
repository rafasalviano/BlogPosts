import { SessionStatusTypes } from "@/constants/session-status-types";
import { Container } from "@/ui/components/container/Container";
import { Layout } from "@/ui/components/layout/layout";
import { ActiveLink } from "@/ui/components/navigation/Active-link";
import { Footer } from "@/ui/components/navigation/Footer";
import { Navigation } from "@/ui/components/navigation/Navigation";
import { Seo } from "@/ui/components/seo/Seo";
import { Button } from "@/ui/design-system/button/Button";
import { Logo } from "@/ui/design-system/logo/Logo";
import { Typography } from "@/ui/design-system/typography/Typography";
import { RiUser6Fill } from "react-icons/ri";

export default function DesignSystem () {
    return (
        <>
          <Layout  sessionStatus={SessionStatusTypes.REGISTERED}>
            <Container>
              <ActiveLink href="design-system">TESTACTIVELINK</ActiveLink>
              <Seo title="Coders Monkeys" description="Description..." />
              <Typography theme="primary" variant="display">bla bla</Typography>
              <Typography theme="secondary" variant="h2">bla bla</Typography>
              <Typography>Design System</Typography>
              <p className="text-red-200">TEST COLOR</p>
              <Button variant="ico" disabled icon={{icon: RiUser6Fill}}></Button>
              <Button variant="accent" icon={{icon: RiUser6Fill}}>TEXT BUTTON</Button>
              <Button isLoading variant="accent" icon={{icon: RiUser6Fill}}>TEXT BUTTON</Button>
              <Button isLoading variant="outline" icon={{icon: RiUser6Fill}}>TEXT BUTTON</Button>
              <Logo size="extra-small"/>
              <Logo size="small"/>
              <Logo />
              <Logo size="large"/>
            </Container>
          </Layout>
        </>
    );
}