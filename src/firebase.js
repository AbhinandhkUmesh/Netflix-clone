
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyADKIxJiHm8cnm6tHivTWnfH8YH-mM_0IA",
  authDomain: "netflix-clone-by-abhi.firebaseapp.com",
  projectId: "netflix-clone-by-abhi",
  storageBucket: "netflix-clone-by-abhi.appspot.com",
  messagingSenderId: "938441435415",
  appId: "1:938441435415:web:ab0b0359194b28e09aef52",
  measurementId: "G-VJYJR7N20D"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password );
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            authProvider: "local",
            email:email,
        });
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () => {
    signOut(auth);
}


export {
    auth,db,login,signup,logout
}