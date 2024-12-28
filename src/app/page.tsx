"use client";

// import { useSession, signIn, signOut } from "next-auth/react";
import HeroCarousel from "./components/carousel";
import HowWeWork from "./components/landingpage/howitworks";
import PopularCampaigns from "./components/landingpage/popularcampaings";
import Aboutsection from "./components/landingpage/aboutus";
import Createsection from "./components/landingpage/createsection";
import GallerySection from "./components/landingpage/gallary";

export default function Home() {
  // const { data: session } = useSession();

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          overflow: "hidden",
          // margin: "0 0 20rem 0",
          padding: "0 0 2rem 0",
          // padding: "2rem",
        }}
        className="shadow-lg shadow-b"
      >
        <HeroCarousel />
      </section>
      <section>
        <Aboutsection />
        <HowWeWork />
        <PopularCampaigns />
        <Createsection/>
        <GallerySection/>
       
      </section>
    </div>
  );
}
