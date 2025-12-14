const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 z-10" />
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] text-foreground uppercase">
            Our Guarantee
          </h1>
          
          <div className="space-y-6 max-w-xl mx-auto">
            <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed">
              <span className="font-medium">Quality:</span> our motto is "standard without compromise".
            </p>
            
            <p className="font-body text-lg md:text-xl text-foreground/90 leading-relaxed">
              <span className="font-medium">Hassle-Free:</span> once you've placed your order, we take care of everything.
            </p>
          </div>

          <a
            href="#shop"
            className="inline-flex items-center justify-center px-12 py-4 border border-foreground text-foreground font-body text-sm tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
