import UseFirebaseAuth from "@/hooks/use-firebase-auth"
import { FC, useContext } from "react"
import { createContext } from "react"

const init = {
    uid: "",
    email: "",
    displayName: "",
    emailVerified: false,
    photoURL: "",
    phoneNumber: "",
    userDocument: {} as userDocument
}

const authUserContext = createContext({
    authUser: init,
    authUserIsLoading: true
})

interface IAuthUserProviderProps {
    children: React.ReactElement
}
export const AuthUserProvider:FC<IAuthUserProviderProps> = ({children}) => {
    const auth = UseFirebaseAuth()
    return (
        <authUserContext.Provider value={{ 
            authUser: auth.authUser as {
                uid: string;
                email: string;
                displayName: string;
                emailVerified: boolean;
                photoURL: string;
                phoneNumber: string;
                userDocument: userDocument;
            },
            authUserIsLoading: auth.authUserIsLoading
        }}>
            {children}
        </authUserContext.Provider>
    )
}
export const useAuth = () => useContext(authUserContext)