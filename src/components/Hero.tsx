import { useNavigate } from "react-router-dom";
import onigiriLogo from "@/assets/onigiri-logo.png";

const Hero = () => {
  const navigate = useNavigate();
  
  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-36 pb-20 overflow-hidden bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Onigiri Logo */}
          <div className="opacity-0 animate-fade-in animation-delay-100">
            <img 
              src={onigiriLogo} 
              alt="shi-for onigiri" 
              className="h-20 md:h-28 w-auto mx-auto"
            />
          </div>
          
          {/* Hero Headline - Sequoia serif style */}
          <h1 className="font-display text-hero opacity-0 animate-fade-in animation-delay-200 text-foreground italic">
            shi-for
          </h1>
          
          {/* Description */}
          <p className="text-body-lg text-muted-foreground max-w-lg mx-auto opacity-0 animate-fade-in animation-delay-300 font-light leading-relaxed">
            From inspiration into reality — authored with purpose, worn with meaning. Forged in stoicism. Inspired by Japan. Created to evolve humanity in peace.
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-in animation-delay-400 pt-6">
            <button 
              onClick={goToShop} 
              className="btn-primary"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Sequoia-style bottom divider */}
      <div className="absolute bottom-0 left-6 right-6 sm:left-8 sm:right-8 lg:left-12 lg:right-12 h-px bg-foreground/8" />
    </section>
  );
};

export default Hero;
