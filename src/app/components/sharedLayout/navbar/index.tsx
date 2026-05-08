"use client";

import React, { useState, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AuthContext } from "@/app/context/authprovider";

const linkClass =
  "relative text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-[#1a56db] no-underline after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#1a56db] after:transition-all after:duration-300 hover:after:w-full";

const mobileLink =
  "text-mdfont-medium text-gray-700 border-b border-gray-100 pb-3 transition-colors duration-300 hover:text-[#1a56db]";

const Nav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = useContext(AuthContext);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-[#e8edf5]">
        <div className="mx-auto px-6 lg:px-16 flex items-center justify-between h-16">

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-[#1a56db] no-underline"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            <div className="w-8 h-8 rounded-lg bg-customPrimary flex items-center justify-center">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                  fill="#fff"
                />
              </svg>
            </div>
            ODDFUND
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-7">
            {user ? (
              <>
                <Link href="/Welcome" className={linkClass}>Home</Link>
                <Link href="/dashboard" className={linkClass}>Dashboard</Link>
                <Link href="/contact" className={linkClass}>Contact</Link>
              </>
            ) : (
              <>
                <Link href="/" className={linkClass}>Home</Link>
                <Link href="/about" className={linkClass}>About</Link>
                <Link href="/HowItWorks" className={linkClass}>How it works</Link>
                <Link href="/contact" className={linkClass}>Contact</Link>
              </>
            )}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="flex items-center gap-2 text-sm text-gray-700">
                  <FaUserCircle className="text-gray-400 text-lg" />
                  Hi, {user.name}
                </span>

                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-red-200 text-red-600 transition-all hover:bg-red-50 hover:-translate-y-[1px]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signIn"
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-[#c7d7fc] text-[#1a56db] transition-all hover:bg-[#eff4ff] hover:-translate-y-[1px]"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-customPrimary  transition-all hover:bg-customPrimaryHover hover:-translate-y-[1px] hover:shadow-md"
                >
                  Start a Campaign
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <HiOutlineMenu size={22} />
          </button>
        </div>
      </nav>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={closeDrawer}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] z-50 bg-white border-l border-[#e8edf5] flex flex-col p-6 gap-6 transform transition-transform duration-300 ease-out ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <button
          onClick={closeDrawer}
          className="self-end p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <HiOutlineX size={22} />
        </button>

        {/* LINKS */}
        <div className="flex flex-col gap-4">
          {(user
            ? [
              { href: "/Welcome", label: "Home" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/contact", label: "Contact" },
            ]
            : [
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/services", label: "How it works" },
              { href: "/contact", label: "Contact" },
            ]
          ).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeDrawer}
              className={mobileLink}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="mt-auto flex flex-col gap-3">
          {session || user ? (
            <button
              onClick={() => {
                signOut();
                closeDrawer();
              }}
              className="w-full px-4 py-2.5 rounded-lg text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                href="/signup"
                onClick={closeDrawer}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-[#1a56db] hover:bg-[#1447bc] transition"
              >
                Start a Campaign
              </Link>

              <Link
                href="/signIn"
                onClick={closeDrawer}
                className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium border border-[#c7d7fc] text-[#1a56db] hover:bg-[#eff4ff] transition"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;