const AboutBrand = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <div className="order-2 lg:order-1">
            <div className="aspect-square placeholder-box relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 border border-dashed border-muted-foreground/40 mb-6" />
                <span className="font-body text-xs tracking-[0.2em] leading-relaxed">
                  BRAND PHOTO HERE
                  <br />
                  <span className="text-muted-foreground">Behind-the-Brand Image</span>
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="font-body text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
                Our Philosophy
              </p>
              <h2 className="heading-display text-5xl md:text-6xl mb-6">
                CRAFTED
                <br />
                WITH CARE
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <p className="font-body text-lg leading-relaxed">
                sekhonfy is built on one belief: quality over quantity. We focus exclusively on oversized t-shirts, perfecting every detail.
              </p>
              <p className="font-body leading-relaxed">
                Premium 300gsm cotton, reinforced stitching, and a relaxed silhouette designed to last. No trends, no compromises—just timeless essentials built to endure.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="heading-display text-4xl">300</p>
                <p className="font-body text-xs tracking-widest text-muted-foreground mt-2">GSM COTTON</p>
              </div>
              <div>
                <p className="heading-display text-4xl">100%</p>
                <p className="font-body text-xs tracking-widest text-muted-foreground mt-2">PREMIUM</p>
              </div>
              <div>
                <p className="heading-display text-4xl">∞</p>
                <p className="font-body text-xs tracking-widest text-muted-foreground mt-2">WEARS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
