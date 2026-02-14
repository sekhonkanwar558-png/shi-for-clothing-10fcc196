const CraftsmanshipSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-16 md:mb-24">
            <p className="text-label text-muted-foreground mb-6">
              Craftsmanship
            </p>
            <div className="accent-line mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-12 text-center">
            {/* Pillar 1 */}
            <div className="space-y-6">
              <p className="text-label text-accent">01</p>
              <h3 className="font-display text-subsection text-foreground font-light italic">
                Premium Cotton
              </h3>
              <p className="text-body text-muted-foreground">
                Sourced from the finest long-staple cotton, each fibre is chosen for its softness, durability, and natural lustre.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-6">
              <p className="text-label text-accent">02</p>
              <h3 className="font-display text-subsection text-foreground font-light italic">
                Precision Tailoring
              </h3>
              <p className="text-body text-muted-foreground">
                Every seam is placed with intention. The fit is architectural — designed to drape, not cling, moving with the wearer in quiet harmony.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-6">
              <p className="text-label text-accent">03</p>
              <h3 className="font-display text-subsection text-foreground font-light italic">
                Timeless Design
              </h3>
              <p className="text-body text-muted-foreground">
                We reject trends. Our garments are built to endure — not just in fabric, but in relevance. A white t-shirt that transcends time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
