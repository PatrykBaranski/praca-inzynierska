import React, { useContext, useState, useEffect } from "react";
import { authentication } from "../firebase";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  function signup(email, password) {
    return authentication.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return authentication.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return authentication.signOut();
  }
  function resetPassword(email) {
    return authentication.sendPasswordResetEmail(email);
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
