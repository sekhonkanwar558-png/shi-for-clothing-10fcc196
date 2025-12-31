import { ChevronDown } from "lucide-react";
const Hero = () => {
  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative min-h-screen flex flex-col justify-center pt-16 md:pt-20 overflow-hidden bg-background">
      
      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground uppercase opacity-0 animate-fade-in animation-delay-100 bg-black/0">
            ​A White T-Shirt Is All You Need
          
          </p>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.08em] sm:tracking-[0.1em] text-foreground opacity-0 animate-fade-in animation-delay-200">
            shi-for
          </h1>
          
          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-md sm:max-w-xl mx-auto leading-relaxed font-light px-4 opacity-0 animate-fade-in animation-delay-300">
            Pure simplicity. Exceptional quality. Plain white t-shirts crafted with the finest fabrics and meticulous stitching.
          </p>

          <div className="opacity-0 animate-fade-in animation-delay-400">
            <button onClick={scrollToShop} className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 text-foreground font-body text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:text-muted-foreground transition-all duration-300 active:scale-[0.98] touch-manipulation relative after:absolute after:bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-px after:bg-foreground after:transition-all after:duration-300 hover:after:w-1/2">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - centered */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 opacity-0 animate-fade-in animation-delay-500">
        <button onClick={scrollToShop} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation" aria-label="Scroll to shop">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase hidden sm:block">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </div>
    </section>;
};
export default Hero;