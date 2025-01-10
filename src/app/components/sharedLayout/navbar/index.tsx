import React, { useContext, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "@/app/context/authprovider";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const { user } = useContext(AuthContext); // Use AuthContext to get user state

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className=" border-b border-gray-200 shadow-sm glass-nav">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MySite
        </Link>

        {/* Hamburger Menu for Small Screens */}
        <button
          className="text-gray-800 text-2xl sm:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links for Larger Screens */}
        <div className="hidden sm:flex items-center space-x-6">
          { user ? (
            <div className="flex items-center space-x-6">
              <Link href="/Welcome" className="text-white hover:text-gray-800">
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-white hover:text-gray-800"
              >
                Dashboard
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-800">
                Contact
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-white hover:text-gray-800">
                Home
              </Link>
              <Link href="/about" className="text-white hover:text-gray-800">
                About
              </Link>
              <Link href="/services" className="text-white hover:text-gray-800">
                Services
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-800">
                Contact
              </Link>
            </div>
          )}
          { user ? (
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-white">
                <FaUserCircle className="mr-2 text-xl text-gray-500" />
                Hi, {user.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-customPrimary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/signIn"
                className="bg-customPrimary text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-customPrimary text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar for Small Screens */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col space-y-6">
            <button
              className="text-gray-800 text-2xl sm:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
            {/* <Link href="/" className="text-gray-800 hover:text-white">
              Home
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-white">
              About
            </Link>
            <Link href="/services" className="text-gray-800 hover:text-white">
              Services
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-white">
              Contact
            </Link> */}

            {user ? (
            <div className="flex-col items-center space-x-6">
                <Link
                  href="/Welcome"
                  className="text-white hover:text-gray-800"
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="text-white hover:text-gray-800"
                >
                  Dashboard
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:text-gray-800"
                >
                  Contact
                </Link>
              </div>
            ) : (
              <div className="flex-col items-center space-x-6">
                <Link href="/" className="text-white hover:text-gray-800">
                  Home
                </Link>
                <Link href="/about" className="text-white hover:text-gray-800">
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-white hover:text-gray-800"
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className="text-white hover:text-gray-800"
                >
                  Contact
                </Link>
              </div>
            )}
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-customPrimary text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/signIn"
                  className="bg-customPrimary text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-customPrimary text-white px-4 py-2 rounded-lg hover:bg-red-800 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
