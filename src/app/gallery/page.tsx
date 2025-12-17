import Navbar from "@/components/Navbar";
import GalleryHero from "@/components/GalleryHero";
import GalleryGrid from "@/components/GalleryGrid";
import Footer from "@/components/Footer";

export default function Gallery() {
  return (
    <main className="relative min-h-screen bg-[#1B1B1B]">
      <Navbar />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
    </main>
  );
}
