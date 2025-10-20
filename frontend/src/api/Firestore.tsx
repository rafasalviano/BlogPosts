import { db } from "@/config/firebase-config"
import { FirebaseError } from "firebase/app"
import { doc, setDoc, updateDoc } from "firebase/firestore"

// data comes from: 
// form → email + how_did_hear, 
// from auth → userCredentials.user.uid
// from new Date()
export const firestoreCreateDocument = async (collectionName: string, documentID: string, data: object) =>{
    try {
        const documentRef = doc(db, collectionName, documentID);
        await setDoc(documentRef, data)
        return {data: true}
    } catch(error) {
        const firebaseError = error as FirebaseError
        return {error: {
            code: firebaseError.code,
            message: firebaseError.message
        }}
    }
}

export const firestoreUpdateDocument = async (collectionName: string, documentID: string, data:object) => {
    try {
        const documentRef = doc(db, collectionName, documentID) // docRef already contains db as prop
        await updateDoc(documentRef, data)
        return {data: true}
    } catch(error){
        const firebaseError = error as FirebaseError
        return (
            {
                error: {
                    code: firebaseError.code,
                    message: firebaseError.message
                }
            }
        )
    }
}