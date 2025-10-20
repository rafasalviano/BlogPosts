// Todo esse trem é só pra ter uma variável userAuth interna acessível por todos os arquivos aqui
// que carregue dados do usuário vindos de Firebase + o documento salvo em Firestore.
// É uma trabalheira só pra criar esse objeto userAuth e mantê-lo atualizado.

import { auth, db } from "@/config/firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UseFirebaseAuth() {
    const [authUser, setAuthUser] = useState<User | UserInterface | null>(null)
    const [authUserIsLoading, setAuthUserIsLoading] = useState<boolean>(true)

    const formattedUser = (authUser: User) => {
        const compactUser = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            emailVerified: authUser.emailVerified,
            photoURL: authUser.photoURL,
            phoneNumber: authUser.phoneNumber
        } as UserInterface
        return compactUser
    }

    const getUserDocument = (compactUser: UserInterface) => {
        if(auth.currentUser) {
            const documentRef = doc(db ,"users", auth.currentUser.uid)
            onSnapshot(documentRef, (doc) => {
                if (doc.exists()) {
                    compactUser.userDocument = doc.data() as userDocument
                }
                setAuthUser((prevAuthUser) => ({
                    ...prevAuthUser, ...compactUser
                }))
                setAuthUserIsLoading(false)
            })
        }
    }

    const authStateChanged = async (authUser: User | null) => {
        if(authUser == null) {
            setAuthUser(null)
            setAuthUserIsLoading(false)
            return
        }
        // salvar parte útil de User em authUser e adicionar o documento correspondente a authUser
        const compactUser = formattedUser(authUser)
        await getUserDocument(compactUser)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, authStateChanged)
        return () => unsubscribe()
    },[])

    return ({authUser, authUserIsLoading})
}