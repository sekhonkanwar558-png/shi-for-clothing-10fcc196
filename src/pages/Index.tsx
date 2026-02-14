import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import DiscountBanner from "@/components/DiscountBanner";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DiscountBanner />
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <CraftsmanshipSection />
      <div className="section-divider" />
      <NewsletterSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
