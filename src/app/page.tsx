import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContentGrid from "@/components/ContentGrid";
import MissionStatement from "@/components/MissionStatement";
import ShepherdsSection from "@/components/ShepherdsSection";
import Ministries from "@/components/Ministries";
import GivingSection from "@/components/GivingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#1B1B1B]">
      <Navbar />
      <Hero />
      <ContentGrid />
      <MissionStatement />
      <ShepherdsSection />
      <Ministries />
      <GivingSection />
      <Footer />
    </main>
  );
}
