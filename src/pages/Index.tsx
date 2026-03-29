import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import BrandMarquee from "@/components/BrandMarquee";
import PhilosophySection from "@/components/PhilosophySection";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import InstagramButton from "@/components/InstagramButton";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <AboutSection />
      <BrandMarquee />
      <div className="section-divider" />
      <PhilosophySection />
      <div className="section-divider" />
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
