import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShopifyShopSection from "@/components/ShopifyShopSection";
import AboutSection from "@/components/AboutSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ShopifyShopSection />
      <AboutSection />
      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
