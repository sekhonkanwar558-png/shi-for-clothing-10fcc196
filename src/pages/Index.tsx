import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import BrandMarquee from "@/components/BrandMarquee";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InstagramButton from "@/components/InstagramButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <AboutSection />
      <BrandMarquee />
      <CraftsmanshipSection />
      <div className="section-divider" />
      <NewsletterSection />
      <Footer />
      <InstagramButton />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
