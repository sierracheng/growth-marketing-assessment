import Navbar from "@/components/Navbar";
import Variant1Hero from "@/components/Variant1Hero";
import ExclusiveBenefits from "@/components/ExclusiveBenefits";
import AuthenticityBlock from "@/components/AuthenticityBlock";
import FoundingOffer from "@/components/FoundingOffer";
import FoundingQuotes from "@/components/FoundingQuotes";
import Variant1CTA from "@/components/Variant1CTA";
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
      <Navbar config={config} topOffset={36} />
      <main>
        <Variant1Hero config={config} />
        <ExclusiveBenefits />
        <AuthenticityBlock />
        <FoundingOffer config={config} />
        <FoundingQuotes />
        <Variant1CTA config={config} />
      </main>
      <Footer />
    </>
  );
}
