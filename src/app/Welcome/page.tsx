"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authprovider";

export default function WelcomePage() {
  const router = useRouter();
  const { user, loading ,setUser} = useContext(AuthContext);
console.log(user)  
console.log(user?.uid)  
setUser(user)
  useEffect(() => {
    if (!user) {
      router.push("/signIn");
    }
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="welcome">
      <h1>Welcome to the Fundraiser App</h1>
      <p>Sign in to create or donate to campaigns!</p>
      <a href="/dashboard" className="text-blue-500 underline">
        Go to Dashboard
      </a>
    </div>
  );
}
