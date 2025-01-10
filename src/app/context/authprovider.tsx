import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"; // Import Firebase's User type
import { auth } from "../../../firbase.config";

// Define the user type
type User = {
  uid: string;
  name: string | null;
  email: string | null;
};

// Define the context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  signOut: () => Promise<void>;
};

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      if (currentUser) {
        // Map Firebase User to custom User type
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName ?? null, // Use displayName or null
        });
      } else {
        setUser(null);
      }
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
