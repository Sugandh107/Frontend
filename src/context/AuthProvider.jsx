import React, { createContext, useState, useEffect } from 'react';
import { 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile 
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from 'axios'

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Change initial state to null
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photoURL
    });
  };

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    updateUserProfile,
    loading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if(currentUser){
        const userInfo ={email: currentUser.email}
        axios.post('https://backend-2bj9.onrender.com/jwt', userInfo)
          .then( (response) => {
            // console.log(response.data.token);
            if(response.data.token){
                localStorage.setItem("access-token", response.data.token)
            }
          })
    } else{
       localStorage.removeItem("access-token")
    }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
