import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import AboutProfileAndHistory from "@/components/AboutProfileAndHistory";
import AboutMissionVision from "@/components/AboutMissionVision";
import AboutValues from "@/components/AboutValues";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <main className="relative min-h-screen bg-[#1B1B1B]">
      <Navbar />
      <AboutHero />
      <AboutProfileAndHistory />
      <AboutMissionVision />
      <AboutValues />
      <Footer />
    </main>
  );
}
