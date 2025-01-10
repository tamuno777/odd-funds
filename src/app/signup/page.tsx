"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../firbase.config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firbase.config"; 

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [Dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroMessage, setErroMessage] = useState("");
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
      // Add user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        dob: Dob,
        createdAt: new Date().toISOString(),
      });

      console.log("User data saved successfully");

      // Redirect directly to another page
      router.push("/signIn"); // Change this to your desired path
    } catch (error) {
      console.error("Firebase SignUp Error:", error);
      alert("Error creating account: " + error);
      setErroMessage( "An unknown error occurred."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex h-screen bg-customPrimary px-10">
        {/* Image section (visible on large devices only) */}
        <div
          className="hidden lg:block lg:w-1/2  bg-cover bg-center"
          style={{ backgroundImage: "url('/signup.jpeg')" }}
        ></div>

        {/* Form section */}
        <div className="w-full lg:w-1/2 max-w-md m bg-customPrimary p-8 shadow-md flex flex-col items-center justify-center">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-6 text-white">
              Join Us Today !!!
            </h1>
            <div>
              <label className="font-semibold text-sm text-white pb-1 block">
                Full name
              </label>
              <input
                type="text"
                placeholder="First name    Last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-sm text-white pb-1 block">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-white pb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-white pb-1 block">
                Date of Birth
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-gray-800 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                type="date"
                value={Dob}
                onChange={(e) => setDob(e.target.value)}
                id="dob"
              />
            </div>
          </div>

            {/* Error Message */}
            {erroMessage && (
            <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 w-full text-center">
              {erroMessage}
            </div>
          )}
          <button
            onClick={handleSignUp}
            className={`w-full px-4 py-2 text-white rounded ${
              loading ? "bg-custombutton-200" : "bg-custombutton"
            }`}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          <p className="mt-4 text-center text-white">
            Already have an account?{" "}
            <a href="/signIn" className="text-custombutton underline text-bold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
