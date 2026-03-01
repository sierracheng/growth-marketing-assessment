import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FoundingOffer from "@/components/FoundingOffer";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import CTASection from "@/components/CTA";
import Footer from "@/components/Footer";
import UrgencyBanner from "@/components/UrgencyBanner";
import { VARIANTS } from "@/lib/variants";

const config = VARIANTS["variant-1"];
const SPOTS_LEFT = 127;

export const metadata = {
  title: "Aura Wellness — Founding Member Invitation",
  description:
    "You've been selected. Lock in founding member pricing before all 200 spots are claimed.",
};

export default function Variant1Page() {
  return (
    <>
      <UrgencyBanner spotsLeft={SPOTS_LEFT} />
      <Navbar config={config} topOffset={38} />
      <main>
        <Hero config={config} />
        <FoundingOffer config={config} />
        <Features config={config} />
        <SocialProof config={config} />
        <CTASection config={config} />
      </main>
      <Footer />
    </>
  );
}
