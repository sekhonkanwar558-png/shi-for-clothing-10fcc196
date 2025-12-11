import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShopSection from "@/components/ShopSection";
import AboutBrand from "@/components/AboutBrand";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ShopSection />
      <AboutBrand />
      <Footer />
    </main>
  );
};

export default Index;
