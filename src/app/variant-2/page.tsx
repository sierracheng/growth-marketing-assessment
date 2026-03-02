import Navbar from "@/components/Navbar";
import Variant2Hero from "@/components/Variant2Hero";
import UGCGrid from "@/components/UGCGrid";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import ImmersiveCTA from "@/components/ImmersiveCTA";
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
        <Variant2Hero config={config} />
        <UGCGrid />
        <Features config={config} />
        <SocialProof config={config} />
        <ImmersiveCTA config={config} />
      </main>
      <Footer />
    </>
  );
}
