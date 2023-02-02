import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export const checkLoginStatus = () => {

    const auth = getAuth()
    if (auth.currentUser) {
        return true;
    } else {
        return false
    }
}
