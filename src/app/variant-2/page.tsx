import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UGCGrid from "@/components/UGCGrid";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import CTASection from "@/components/CTA";
import Footer from "@/components/Footer";
import { VARIANTS } from "@/lib/variants";

const config = VARIANTS["variant-2"];

export const metadata = {
  title: "Aura Wellness — Join the Community",
  description:
    "10,000+ real members. 41 countries. A community that keeps you accountable and coming back.",
};

export default function Variant2Page() {
  return (
    <>
      <Navbar config={config} />
      <main>
        <Hero config={config} />
        <UGCGrid />
        <Features config={config} />
        <SocialProof config={config} />
        <CTASection config={config} />
      </main>
      <Footer />
    </>
  );
}
