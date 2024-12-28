"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../firbase.config";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const handleSignUp = async () => {
  //   setLoading(true);
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;

  //     // Sign the user in with NextAuth credentials
  //     const res = await signIn("credentials", {
  //       email: email,
  //       password: password,
  //       redirect: false, // Avoid automatic redirection
  //     });

  //     if (res?.ok) {
  //       router.push("/signin");
  //     } else {
  //       console.error("NextAuth signIn error:", res?.error);
  //       alert("Error logging in: " + res?.error);
  //     }
  //   } catch (error) {
  //     console.error("Firebase SignUp Error:", error);
  //     alert("Error creating account: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      // Redirect directly to another page
      router.push("/signIn"); // Change this to your desired path
    } catch (error) {
      console.error("Firebase SignUp Error:", error);
      alert("Error creating account: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded"
        />
        <button
          onClick={handleSignUp}
          className={`w-full px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/signIn" className="text-blue-500 underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
