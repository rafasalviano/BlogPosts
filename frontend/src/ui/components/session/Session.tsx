import { FC } from "react"
import { SessionStatusType, SessionStatusTypes} from "@/constants/session-status-types"
import { ScreenSpinner } from "@/ui/design-system/spinner/ScreenSpinner";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthUserContext";


// Redirecionament: usuário tá logado? onboarding terminou? qual tipo de pág?


interface ISessionProps {
    children: React.ReactElement;
    sessionStatus?: SessionStatusType
}

export const Session: FC<ISessionProps> = ({children, sessionStatus}) => {
    const router = useRouter()
    const {authUser, authUserIsLoading} = useAuth()
    // const onboardingIsCompleted = authUser?.userDocument?.onboardingIsCompleted
    const onboardingIsCompleted = true

    // se tentar sair de onboarding enquanto logado, vai redirecionar pra "/onboarding" de volta
    const shouldRedirectToOnboarding = () => {
        return (
            !authUserIsLoading &&           // não tá refreshing nesse segundo
            authUser &&                     // tá logado
            !onboardingIsCompleted &&       // não terminou o onboarding
            router.asPath !== "/onboarding" // to tentando ir pra outra URL
        )
    }

    // se tentar ir pra onboarding enquanto logado, vai redirecionar pra "/meu-espaco"
    const shouldNotRedirectToOnboarding = () => {
        return (
            !authUserIsLoading &&
            authUser &&
            onboardingIsCompleted && // terminou o onboarding
            router.asPath === "/onboarding"
        )
    }

    // COMEÇA AQUI  
    // Usuário logado, já terminou o onboarding?
    if(shouldNotRedirectToOnboarding()) {
        router.push("/meu-espaco")
        return <ScreenSpinner/>
    }
    if(shouldRedirectToOnboarding()) {
        router.push("/onboarding")
        return <ScreenSpinner/>
    }
    // Se página tipo GUEST for chamada e usuário DESlogado, mostrar página
    if(sessionStatus == SessionStatusTypes.GUEST && !authUserIsLoading) {
        if(!authUser)
            return <>{children}</>
        else router.push("/meu-espaco") // se usuário logado, redirecionar pra "meu-espaco"
    }

    // Se página tipo REGISTERED for chamada e usuário logado, mostrar página
    if(sessionStatus == SessionStatusTypes.REGISTERED && !authUserIsLoading) {
        if(authUser)
            return <>{children}</>
        else router.push("/connexion") // se usuário deslogado, redirecionar pra "connexion"
    }

    // Nem GUEST, nem REGISTERED
    if (!sessionStatus && !authUserIsLoading)
        return <>{children}</>

    return <ScreenSpinner/>
}