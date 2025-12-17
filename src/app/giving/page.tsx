import Navbar from "@/components/Navbar";
import GivingHero from "@/components/GivingHero";
import GivingOffering from "@/components/GivingOffering";
import Footer from "@/components/Footer";

export default function Giving() {
  return (
    <main className="relative min-h-screen bg-[#1B1B1B]">
      <Navbar />
      <GivingHero />
      <GivingOffering />
      <Footer />
    </main>
  );
}
