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
  return <section className="relative min-h-screen flex flex-col justify-center pt-16 md:pt-20 overflow-hidden">
      {/* Video Background with slow zoom */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 animate-slow-zoom">
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background/70 z-10" />
      
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
            <button onClick={scrollToShop} className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 border border-foreground text-foreground font-body text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300 active:scale-[0.98] touch-manipulation">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in animation-delay-500">
        <button onClick={scrollToShop} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation" aria-label="Scroll to shop">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase hidden sm:block">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </div>
    </section>;
};
export default Hero;