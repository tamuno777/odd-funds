
import AboutHero from "../components/about/aboutHero";
import AboutStats from "../components/about/AboutStats";
import CTASection from "../components/about/CTASection";
import MissionSection from "../components/about/MissionSection";
import TeamValues from "../components/about/TeamValues";
import WhyChooseUs from "../components/about/WhyChooseUs";

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white mx-auto max-w-7xl">
      <AboutHero
        badge="About OddFund"
        title="Helping people raise hope through community support"
        sub="We make fundraising simple, transparent, and accessible for everyone."
        image="/aboutBanner.png"
      />

      <MissionSection />

      <AboutStats />

      <WhyChooseUs />

      <TeamValues />

      <CTASection />
    </main>
  );
}