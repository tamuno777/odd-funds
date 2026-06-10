"use client"; // Add this to the top

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import Nav from "./components/sharedLayout/navbar";
import Footer from "./components/sharedLayout/footer";
import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";

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
            {" "}
            <div className="bg-white w-full">
              <Nav />

            </div>
            {children}
          <div className="bg-customPrimary w-full">

            <Footer />
          </div>

        </SessionProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Script src="https://js.paystack.co/v2/inline.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
