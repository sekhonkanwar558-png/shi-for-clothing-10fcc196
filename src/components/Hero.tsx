import { useNavigate } from "react-router-dom";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-20 overflow-hidden bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-12 md:space-y-16">
          {/* Onigiri Logo */}
          <div className="animate-fade-in">
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-28 md:h-40 w-auto mx-auto"
            />
          </div>
          
          {/* Statement headline */}
          <h1 className="font-display text-hero text-foreground font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Purity. Precision.
            <br />
            <em className="italic">Presence.</em>
          </h1>

          {/* Subtext */}
          <p className="text-label text-muted-foreground tracking-[0.3em] animate-fade-in" style={{ animationDelay: '0.4s' }}>
            White, perfected.
          </p>

          {/* Gold accent line */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="w-16 h-px bg-accent" />
          </div>

          {/* CTA */}
          <div className="pt-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => navigate('/shop')} 
              className="btn-primary"
            >
              Shop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
