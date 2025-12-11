import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import AboutBrand from "@/components/AboutBrand";
import ShopPreview from "@/components/ShopPreview";
import Lookbook from "@/components/Lookbook";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      <Navbar />
      <Hero />
      <FeaturedCollection />
      <AboutBrand />
      <ShopPreview />
      <Lookbook />
      <Footer />
    </main>
  );
};

export default Index;
