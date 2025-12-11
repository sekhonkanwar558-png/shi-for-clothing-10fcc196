const AboutBrand = () => {
  return (
    <section id="about" className="py-24 bg-card relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="aspect-square placeholder-box relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 border-2 border-dashed border-muted-foreground/40 mb-6 transform rotate-12" />
                <span className="font-body text-xs tracking-[0.2em] leading-relaxed">
                  BRAND PHOTO HERE
                  <br />
                  <span className="text-primary">Behind-the-Brand Image</span>
                </span>
              </div>
              
              {/* Glitch accent lines */}
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-accent/50 via-transparent to-accent/50 transform -translate-x-4" />
              <div className="absolute bottom-1/3 left-0 w-3/4 h-px bg-gradient-to-r from-primary/50 via-transparent to-transparent transform translate-x-8" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="font-body text-sm tracking-[0.3em] text-primary uppercase mb-4">
                The Brand
              </p>
              <h2 className="heading-display text-5xl md:text-6xl mb-6">
                BREAKING
                <br />
                BOUNDARIES
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <p className="font-body text-lg leading-relaxed">
                DESTRUCTION represents the raw energy of urban rebellion. We craft premium relaxed streetwear built for those who refuse to conform—those who break the ordinary and redefine what style means.
              </p>
              <p className="font-body leading-relaxed">
                Every piece is designed with ultimate comfort in mind, using high-quality materials that move with you through the chaos of city life. Our aesthetic draws from the cracked surfaces of concrete jungles, glitch culture, and graffiti art.
              </p>
              <p className="font-body leading-relaxed">
                We don't follow trends. We destroy them.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="heading-display text-4xl text-primary">2024</p>
                <p className="font-body text-xs tracking-widest text-muted-foreground mt-2">FOUNDED</p>
              </div>
              <div>
                <p className="heading-display text-4xl text-primary">100%</p>
                <p className="font-body text-xs tracking-widest text-muted-foreground mt-2">PREMIUM</p>
              </div>
              <div>
                <p className="heading-display text-4xl text-primary">∞</p>
                <p className="font-body text-xs tracking-widest text-muted-foreground mt-2">ATTITUDE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
