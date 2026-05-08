"use client";

import AboutHero from "../components/about/aboutHero";
import ContactFormSection from "../components/contactUs/ContactFormSection";
import ContactInfoSection from "../components/contactUs/ContactInfoSection";
import FAQSection from "../components/contactUs/FAQSection";
import SupportCTASection from "../components/contactUs/SupportCTASection";


export default function ContactPage() {
  return (
    <main className="overflow-hidden mx-auto max-w-7xl">
      <AboutHero
        badge="We’re here to help"
        title="Contact & Support"
        sub="Need help with donations, campaigns, payouts, or your account? Our support team is always ready to assist you."
        image="/aboutBanner.png"
      />

      <ContactInfoSection />
      <ContactFormSection />
      <FAQSection />
      <SupportCTASection />
    </main>
  );
}