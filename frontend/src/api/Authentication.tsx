// get from firebase or check on notion
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"; //cUWEAP
import { auth, db } from "@/config/firebase-config";
import { FirebaseError } from "firebase/app"; // a firebase error class extended from native javascript Error class
import { doc, setDoc } from "firebase/firestore";

export const firebaseCreateUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword( // I'm making up the variable userCredential
	    auth, // a function that utilizes the singular keys that identify this app of mine
	    email, 
	    password
    );
    return { data: userCredential.user }; 
    // createUserWithEmailAndPassword returns UserCredential obj
    // UserCredential gets injected is userCredential cammel case
    // UserCredential object contains another obj. User
    // the obj. User contains a lot of strings, booleans and methods like -
    // uid, email, displayName, emailVerified, phoneNumber, photoUrl...

  } catch (error) {
    const firebaseError = error as FirebaseError;
    // @todo: format error
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message,
      },
    };
  }
};

export const firebaseSignInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword( // this returns a promise that resolves to UserCredential object
	    auth, // an object returned by getAuth by using the singular keys that identify this app of mine
	    email, 
	    password
    );
    return { data: userCredential.user }; 
    // singInUserWithEmailAndPassword returns UserCredential obj
    // UserCredential gets injected in userCredential cammel case
    // UserCredential object contains another obj. User
    // the obj. User contains a lot of strings, booleans and methods like -
    // uid, email, displayName, emailVerified, phoneNumber, photoUrl...

  } catch (error) {
    const firebaseError = error as FirebaseError;
    // @todo: format error
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message,
      },
    };
  }
};

export const firebaseResetPassword = async (email: string) => {
  try {
    const userCredential = await sendPasswordResetEmail( // this returns a promise that resolves to UserCredential object
	    auth, // an object returned by getAuth by using the singular keys that identify this app of mine
	    email, 
    )
    return {data: true};
    // singInUserWithEmailAndPassword returns UserCredential obj
    // UserCredential gets injected in userCredential cammel case
    // UserCredential object contains another obj. User
    // the obj. User contains a lot of strings, booleans and methods like -
    // uid, email, displayName, emailVerified, phoneNumber, photoUrl...
  } catch (error) {
    const firebaseError = error as FirebaseError;
    // @todo: format error
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message,
      },
    };
  }
};

export const firebaseLogOutUser = async () => {
    try {
        await signOut(
            auth,
        );
        return { data: true };
    } catch (error) {
        const firebaseError = error as FirebaseError;
        //format error
        return {
            error: {
                code: firebaseError.code,
                message: firebaseError.message,
            },
        };
    }
};

export const firebaseEmailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser!) // ! to fix "auth" might be null
    return ({data: true})
  } catch(error) {
    const firebaseError = error as FirebaseError
    return {error: {
        code: firebaseError.code,
        message: firebaseError.message
    }}
  }
}