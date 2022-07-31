import { createContext , useContext, useEffect, useState} from "react";
import  {createUserWithEmailAndPassword} from 'firebase/auth'
import { signInWithEmailAndPassword , onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const authContext = createContext();

export const useAuth = () =>{
    return useContext(authContext);
}


function AuthProvider({children}){

    const [cuser, setCuser] = useState({email: "Usuario", displayName: "Usuario"});
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = {
        login: true,
        name: 'Chiquis'
    }

    const signup = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
        
    }
    const signin = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () =>{ 
        signOut(auth)
    }

    const signInWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }


    useEffect(()=>{
        onAuthStateChanged(auth, currentUser =>{
            if(currentUser){
                setCuser(currentUser);
                console.log(currentUser);
                setLoggedIn(true); 
                console.log(isLoggedIn);
                setLoading(false);
            }else {
                setCuser({email: "Usuario", displayName: "Usuario"});
                setLoggedIn(false);
                console.log(cuser);
            }
        })
    }, []);


    return(
        <authContext.Provider value={{signup, signin, signInWithGoogle ,cuser, logout , loading, isLoggedIn}}>
            {children}
        </authContext.Provider>
    )
}

export default AuthProvider;