"use client"; // Add this to the top

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { AuthProvider } from "./context/authprovider";
import Nav from "./components/sharedLayout/navbar";
import Footer from "./components/sharedLayout/footer";
import { Bricolage_Grotesque } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${geistSans.variable} ${geistMono.variable} `}
      >
        <SessionProvider>
          <AuthProvider>
            {" "}
            <div className="bg-white w-full">
              <Nav />

            </div>
            {children}
          </AuthProvider>
          <div className="bg-customPrimary w-full">

            <Footer />
          </div>

        </SessionProvider>
      </body>
    </html>
  );
}
