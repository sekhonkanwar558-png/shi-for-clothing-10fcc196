const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <p className="font-body text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Premium Essentials
          </p>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.1em] text-foreground">
            shi-for
          </h1>
          
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed font-light">
            Pure simplicity. Exceptional quality. Plain white t-shirts crafted with the finest fabrics and meticulous stitching.
          </p>

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
