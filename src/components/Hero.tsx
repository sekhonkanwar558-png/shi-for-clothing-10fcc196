import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 md:pt-36 pb-20 overflow-hidden bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Label */}
          <p className="text-label text-muted-foreground opacity-0 animate-fade-in animation-delay-100">
            A White T-Shirt Is All You Need
          </p>
          
          {/* Hero Headline */}
          <h1 className="font-display text-hero opacity-0 animate-fade-in animation-delay-200 text-foreground">
            shi-for
          </h1>
          
          {/* Description */}
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in animation-delay-300 font-light">
            Pure simplicity. Exceptional quality. Plain white t-shirts crafted with the finest fabrics and meticulous stitching.
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-in animation-delay-400 pt-4">
            <button 
              onClick={goToShop} 
              className="btn-primary"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;