import Navbar from "@/components/Navbar";
import EventsHero from "@/components/EventsHero";
import EventsGrid from "@/components/EventsGrid";
import Footer from "@/components/Footer";

export default function Events() {
  return (
    <main className="relative min-h-screen bg-[#1B1B1B]">
      <Navbar />
      <EventsHero />
      <EventsGrid />
      <Footer />
    </main>
  );
}
