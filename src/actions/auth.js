import { getAuth, googleAuthProvider, signInWithPopup } from '../firebase/firebase';
const startLogin = () => {
    return () => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
};

const startLogout = () => {
    return () => {
        const auth = getAuth();
        return auth.signOut();
    }
}

const login = (uid) => ({
    type: 'LOGIN',
    uid
});

const logout = () => ({
    type: 'LOGOUT'
});

export { startLogin, startLogout, login, logout };