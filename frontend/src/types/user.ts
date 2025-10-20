interface UserInterface {
    uid: string;
    email: string | null;
    displayName: string | null;
    emailVerified: boolean | null;
    photoURL: string | null;
    phoneNumber?: string;
    userDocument: userDocument | null;
}

interface userDocument {
    email: string;
    password: string;
    how_did_hear: string
    onboardingIsCompleted: boolean
}
