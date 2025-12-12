import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShopifyShopSection from "@/components/ShopifyShopSection";
import AboutBrand from "@/components/AboutBrand";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ShopifyShopSection />
      <AboutBrand />
      <Footer />
    </main>
  );
};

export default Index;
