import { FaHeart, FaRocket, FaCheckCircle } from "react-icons/fa";
import { HiChartBar } from "react-icons/hi";
import {  FiTarget } from "react-icons/fi";

export const slides = [
  {
    badge: "Trusted by thousands",
    title: ["Make ", "real change", " today"],
    titleAccent: [false, true, false],
    sub: "Start a campaign, donate to causes you care about, and track every naira in real time.",
    cta1: "Start a Campaign",
    cta1Route: "/signup",
    cta2: "Explore Campaigns",
    cta2Route: "/campaigns",
    stats: [
      { num: "₦2B+", label: "Raised so far" },
      { num: "18K+", label: "Campaigns funded" },
    ],
    image: "/hero1.png",
    floatLeft: { icon: FaHeart, label: "New donation", val: "₦50,000" },
    floatRight: { icon: FiTarget, label: "Goal reached", val: "94%" },
  },
  {
    badge: "Give with confidence",
    title: ["Every gift changes a ", "life", ""],
    titleAccent: [false, true, false],
    sub: "From ₦500 to millions, your support reaches real people with full transparency and trust.",
    cta1: "Donate towards a cause",
    cta1Route: "/campaigns",
    cta2: "See Impact Stories",
    cta2Route: "/about",
    stats: [
      { num: "98%", label: "Funds delivered" },
      { num: "24H", label: "Average payout" },
    ],
    image: "/hero2.jpg",
    floatLeft: { icon: FaCheckCircle, label: "Verified campaigns", val: "Safe to give" },
    floatRight: { icon: FaHeart, label: "Active supporters", val: "1,203" },
  },
  {
    badge: "Join our mission",
    title: ["Building a ", "better world", " today"],
    titleAccent: [false, true, false],
    sub: "Launch a campaign in minutes and join a community driving real impact together.",
    cta1: "Get Started , it's free",
    cta1Route: "/signup",
    cta2: "How it works",
    cta2Route: "/about",
    stats: [
      { num: "3 min", label: "To launch" },
      { num: "0%", label: "Platform fee" },
    ],
    image: "/hero1.png",
    floatLeft: { icon: FaRocket, label: "Just launched", val: "Live now" },
    floatRight: { icon: HiChartBar, label: "Tracking", val: "Real-time" },
  },
];