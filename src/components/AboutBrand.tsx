const AboutBrand = () => {
  return (
    <section id="about" className="py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <p className="font-body text-xs tracking-[0.4em] text-muted-foreground uppercase">
              Our Philosophy
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light tracking-[0.1em] text-foreground">
              Pure Simplicity
            </h2>
          </div>

          <div className="space-y-6 text-muted-foreground max-w-2xl mx-auto">
            <p className="font-body text-lg leading-relaxed font-light">
              At shi-for, we believe in the power of simplicity. One color. One style. Perfected.
            </p>
            <p className="font-body leading-relaxed font-light">
              Every t-shirt is crafted from the finest premium cotton, with reinforced stitching that ensures lasting quality. No logos, no prints—just pure, timeless white.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-12 pt-12 border-t border-border max-w-xl mx-auto">
            <div>
              <p className="font-display text-3xl font-light text-foreground">300</p>
              <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mt-2 uppercase">GSM Cotton</p>
            </div>
            <div>
              <p className="font-display text-3xl font-light text-foreground">100%</p>
              <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mt-2 uppercase">Premium</p>
            </div>
            <div>
              <p className="font-display text-3xl font-light text-foreground">∞</p>
              <p className="font-body text-xs tracking-[0.2em] text-muted-foreground mt-2 uppercase">Wears</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
