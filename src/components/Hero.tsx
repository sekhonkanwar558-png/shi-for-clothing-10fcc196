import { useNavigate } from "react-router-dom";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Hero = () => {
  const navigate = useNavigate();
  
  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 md:pt-36 pb-20 overflow-hidden bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-10 md:space-y-14">
          {/* Onigiri Logo — symbolic, centered */}
          <div className="opacity-0 animate-fade-in animation-delay-100">
            <img 
              src={onigiriLogo} 
              alt="shi-for" 
              className="h-24 md:h-36 w-auto mx-auto"
            />
          </div>
          
          {/* Statement headline */}
          <div className="space-y-4 opacity-0 animate-fade-in animation-delay-300">
            <h1 className="font-display text-hero text-foreground font-light">
              Purity. Precision.
              <br />
              <em className="italic">Presence.</em>
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-label text-muted-foreground opacity-0 animate-fade-in animation-delay-500">
            White, perfected.
          </p>

          {/* Gold accent line */}
          <div className="opacity-0 animate-fade-in animation-delay-600 flex justify-center">
            <div className="accent-line" />
          </div>

          {/* CTA */}
          <div className="opacity-0 animate-fade-in animation-delay-800 pt-4">
            <button 
              onClick={goToShop} 
              className="btn-primary"
            >
              Explore the Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
