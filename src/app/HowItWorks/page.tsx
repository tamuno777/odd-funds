import AboutHero from "../components/about/aboutHero";
import DonationFlow from "../components/howItWorks/DonationFlow";
import HowCTA from "../components/howItWorks/HowCTA";
import HowFeatures from "../components/howItWorks/HowFeatures";
import ProcessSteps from "../components/howItWorks/processSteps";
import TrustSection from "../components/howItWorks/TrustSection";


export default function HowItWorks() {
  return (
    <main className="overflow-hidden bg-white">
      <AboutHero
        badge="How OddFund Works"
        title="Simple fundraising built for real people"
        sub="Create campaigns, receive donations, and track impact with a transparent and secure crowdfunding experience."
        image="/aboutBanner.png"
      />

      <ProcessSteps />

      <HowFeatures />

      <DonationFlow />

      <TrustSection />

      <HowCTA />
    </main>
  );
}
