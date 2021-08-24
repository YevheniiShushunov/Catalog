import React, {useState, useEffect, useContext} from 'react'
import { Preloader } from '../component/preloader/Preloader';
import { auth } from '../firebase';

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const  AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
        console.log("called")
        return auth.signOut();
        
    }

    

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    },[])

    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            <Preloader inProgress={loading === true}>
                {!loading && children}
            </Preloader>
        </AuthContext.Provider>
    )
}