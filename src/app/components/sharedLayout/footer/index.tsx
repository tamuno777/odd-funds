import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-customPrimary text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold">
              ODD FUND
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              A simple, transparent fundraising platform that connects people
              who need help with those willing to give.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="hover:text-white transition"><Link href="/HowItWorks">Campaigns</Link></li>
              <li className="hover:text-white transition"><Link href="/HowItWorks">How it works</Link></li>
              <li className="hover:text-white transition"><Link href="/HowItWorks">Start a campaign</Link></li>
              <li className="hover:text-white transition"><Link href="/HowItWorks">Donate</Link></li>
              
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="hover:text-white transition">Help Center</li>
              <li className="hover:text-white transition">Contact Us</li>
              <li className="hover:text-white transition">Trust & Safety</li>
              <li className="hover:text-white transition">Terms & Privacy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">
              Stay connected
            </h3>

            <p className="mt-4 text-sm text-white/70">
              Follow us for updates and impact stories.
            </p>

            <div className="mt-5 flex gap-3">
              <Link href={"#"} className="rounded-full bg-white/10 p-2 hover:bg-white hover:text-customPrimary transition">
                <FaTwitter />
              </Link>
              <Link href={"#"} className="rounded-full bg-white/10 p-2 hover:bg-white hover:text-customPrimary transition">
                <FaFacebookF />
              </Link>
              <Link href={"#"} className="rounded-full bg-white/10 p-2 hover:bg-white hover:text-customPrimary transition">
                <FaInstagram />
              </Link>
              <Link href={"#"} className="rounded-full bg-white/10 p-2 hover:bg-white hover:text-customPrimary transition">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-sm text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} OddFund. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white transition cursor-pointer">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;