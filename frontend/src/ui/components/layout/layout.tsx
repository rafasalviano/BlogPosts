import { FC } from "react"
import { Navigation } from "../navigation/Navigation"
import { Footer } from "../navigation/Footer"
import { Breadcrumbs } from "../breadcrumbs/Breadcrumbs"
import { UserAccountNavigation } from "../navigation/UserAccountNavigation"
import { Container } from "../container/Container"
import { Session } from "@/ui/components/session/Session"
import { SessionStatusType } from "@/constants/session-status-types"

interface ILayout {
    children: React.ReactNode
    isDisplayBreadcrumbs?: boolean;
    withSidebar?: boolean;
    sessionStatus?: SessionStatusType;
}

export const Layout: FC<ILayout> = ({
    children,
    isDisplayBreadcrumbs = true,
    withSidebar,
    sessionStatus
}) => {

    let view: React.ReactElement = <></>
    if(withSidebar) {
        view = (
            <Container className="flex-grow mb-14">
                <div className="grid grid-cols-12 gap-7">
                    <div className="col-span-3"><UserAccountNavigation/></div>
                    <div className="col-span-9">{children}</div>
                </div>
            </Container>
        )
    } else {
        view = <>{children}</>
    }
    return (
        // tiramos navigation e footer acima e abaixo das duas linhas dentro do div
    <Session sessionStatus={sessionStatus}>
        <div className="flex flex-col min-h-screen">
            {isDisplayBreadcrumbs && <Breadcrumbs />}
            <div className="flex-grow">{view}</div>
        </div>
    </Session>
    )
}

