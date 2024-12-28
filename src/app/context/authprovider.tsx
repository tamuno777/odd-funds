"use client"
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Replace with your auth library
import { auth } from "../../../firbase.config";

// Define the user type
type User = {
  uid: string;
  email: string | null; // Adjust to match Firebase's structure
};

// Define the context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>; // Corrected to boolean
  signOut: () => Promise<void>;
};

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => null, // Placeholder function
  setLoading: () => {}, // Placeholder function (no return type for Dispatch)
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? { uid: currentUser.uid, email: currentUser.email } : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
