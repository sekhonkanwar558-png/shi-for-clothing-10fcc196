const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <p className="font-body text-sm tracking-[0.3em] text-muted-foreground uppercase">
                Premium Essentials
              </p>
              <h1 className="heading-display text-6xl md:text-7xl lg:text-8xl">
                LESS IS MORE.
              </h1>
              <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-muted-foreground">
                QUALITY IS EVERYTHING.
              </h2>
            </div>

            <p className="font-body text-lg text-muted-foreground max-w-md leading-relaxed">
              Meticulously crafted oversized t-shirts. Premium fabrics, timeless design, uncompromising quality.
            </p>

            <a
              href="#shop"
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-display text-xl tracking-wider hover:bg-primary/90 transition-all"
            >
              EXPLORE
            </a>
          </div>

          {/* Right - Image Placeholder */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="aspect-[4/5] placeholder-box relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 border border-dashed border-muted-foreground/50 mb-6" />
                <span className="font-body text-xs tracking-[0.2em] leading-relaxed">
                  IMAGE PLACEHOLDER
                  <br />
                  <span className="text-muted-foreground">Upload Branded Photo Here</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
