import Navbar from "@/components/Navbar";
import MinistriesHero from "@/components/MinistriesHero";
import MinistriesGrid from "@/components/MinistriesGrid";
import Footer from "@/components/Footer";

export default function Ministries() {
  return (
    <main className="relative min-h-screen bg-[#1B1B1B]">
      <Navbar />
      <MinistriesHero />
      <MinistriesGrid />
      <Footer />
    </main>
  );
}
