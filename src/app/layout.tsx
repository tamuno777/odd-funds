"use client"; // Add this to the top

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { AuthProvider } from "./context/authprovider";
import Nav from "./components/sharedLayout/navbar";
import Footer from "./components/sharedLayout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the components with both SessionProvider and AuthProvider */}
        <SessionProvider>
          <AuthProvider>
            {" "}
            <div className="bg-customPrimary w-full">
            <Nav />

            </div>
            {children}
          </AuthProvider>
          <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}
