import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import EditorialFeatures from "@/components/EditorialFeatures";
import SocialProof from "@/components/SocialProof";
import ImmersiveCTA from "@/components/ImmersiveCTA";
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
        <BrandStory />
        <EditorialFeatures config={config} />
        <SocialProof config={config} />
        <ImmersiveCTA config={config} />
      </main>
      <Footer />
    </>
  );
}
