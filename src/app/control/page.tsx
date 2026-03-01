import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import CTASection from "@/components/CTA";
import Footer from "@/components/Footer";
import { VARIANTS } from "@/lib/variants";

const config = VARIANTS["control"];

export const metadata = {
  title: "Aura Wellness — Reclaim Your Calm",
  description:
    "Studio-grade movement, mindfulness practices, and organic living — all in one place. Start your 7-day free trial.",
};

export default function ControlPage() {
  return (
    <>
      <Navbar config={config} />
      <main>
        <Hero config={config} />
        <Features config={config} />
        <SocialProof config={config} />
        <CTASection config={config} />
      </main>
      <Footer />
    </>
  );
}
