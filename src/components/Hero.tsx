const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      {/* Decorative crack lines */}
      <div className="crack-line w-full top-1/4 left-0 transform -rotate-2" />
      <div className="crack-line w-3/4 top-1/2 right-0 transform rotate-1" />
      <div className="crack-line w-1/2 bottom-1/4 left-1/4 transform -rotate-3" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <p className="font-body text-sm tracking-[0.3em] text-primary uppercase">
                Streetwear Redefined
              </p>
              <h1 
                className="heading-display text-6xl md:text-7xl lg:text-8xl text-glitch"
                data-text="DESTROY THE ORDINARY."
              >
                DESTROY THE ORDINARY.
              </h1>
              <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-muted-foreground">
                WEAR THE UNEXPECTED.
              </h2>
            </div>

            <p className="font-body text-lg text-muted-foreground max-w-md leading-relaxed">
              Breaking norms through premium relaxed fits. DESTRUCTION is not just clothing—it's a statement of raw urban energy and unapologetic style.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-display text-xl tracking-wider hover:bg-primary/90 transition-all animate-pulse-glow"
              >
                SHOP NOW
              </a>
              <a
                href="#lookbook"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-display text-xl tracking-wider hover:border-primary hover:text-primary transition-all"
              >
                VIEW LOOKBOOK
              </a>
            </div>
          </div>

          {/* Right - Image Placeholder */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="aspect-[4/5] placeholder-box relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 border-2 border-dashed border-muted-foreground/50 mb-6" />
                <span className="font-body text-xs tracking-[0.2em] leading-relaxed">
                  IMAGE PLACEHOLDER
                  <br />
                  <span className="text-primary">Upload Branded Photo Here</span>
                </span>
              </div>
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
