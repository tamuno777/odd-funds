"use client";

// import { useSession, signIn, signOut } from "next-auth/react";
import HeroCarousel from "./components/carousel";
import HowWeWork from "./components/landingpage/howitworks";
import PopularCampaigns from "./components/landingpage/popularcampaings";
import Aboutsection from "./components/landingpage/aboutus";
import Createsection from "./components/landingpage/createsection";
import GallerySection from "./components/landingpage/gallary";
import StatsSection from "./components/countdown/countdown";

export default function Home() {
  return (

    <div className="w-full overflow-x-hidden">

      <section className="w-full overflow-hidden shadow-sm">
        <HeroCarousel />
      </section>

      <section className="w-full">
        <Aboutsection />
      </section>

      <section className="w-full">
        <HowWeWork />
      </section>

      <section className="w-full">
        <StatsSection />
      </section>

      <section className="w-full">
        <PopularCampaigns />
      </section>

      <section className="w-full">
        <Createsection />
      </section>

      <section className="w-full">
        <GallerySection />
      </section>

    </div>
  );
}