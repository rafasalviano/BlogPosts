// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJebaMhs2uJ4GUOw_Z1PBtYSsTe0V4FmE",
  authDomain: "codermonkeysproj.firebaseapp.com",
  projectId: "codermonkeysproj",
  storageBucket: "codermonkeysproj.firebasestorage.app",
  messagingSenderId: "901848016103",
  appId: "1:901848016103:web:8b3c62bb1961805a276e42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); //  returns an FirebaseApp object instance
// You need it because other Firebase services (Auth, Firestore, Storage, etc.) are attached to a particular app.
export const auth = getAuth(app); // app in the bracks is optional, returns an Auth object instance bound to the app
export default app;
export const db = getFirestore(app) 

/*

🔑 Main properties on >>FirebaseApp<< object (returned from initializeApp(firebaseConfig))
(It’s basically a container that represents your initialized Firebase project.)

 >> name                           →   the name of the app.
 >> options                        →   the configuration object you passed in (firebaseConfig).
 >> automaticDataCollectionEnabled →   boolean for analytics data collection.
 >> _isDeleted (internal, not for use).


🔑 Main Properties in >>Auth<< object (returned from getAuth(app))
app →           the FirebaseApp this Auth is scoped to.
currentUser →   the currently signed-in User object (or null if nobody is signed in).
languageCode →  string code used for UI/localized emails, like "en", "pt", "fr".
settings →      configuration for Auth, e.g. auth.settings.appVerificationDisabledForTesting.
tenantId →      if using multi-tenancy, specifies which tenant this instance is working with.
name →          internal string name of this service instance.

🛠️ Common Methods in >>Auth<< object
onAuthStateChanged()                                                      → listener for sign-in / sign-out events.
signInWithEmailAndPassword(), createUserWithEmailAndPassword(), signOut() → sign-in/out methods.
signInWithPopup(), signInWithRedirect()                                   → OAuth provider logins.
updateCurrentUser(), setPersistence(), etc.

*/
