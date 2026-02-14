const CraftsmanshipSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-20 md:mb-28">
            <p className="text-label text-muted-foreground tracking-[0.3em] mb-8">
              Craftsmanship
            </p>
            <div className="w-12 h-px bg-accent mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-14 text-center">
            {/* Pillar 1 */}
            <div className="space-y-7">
              <p className="text-label text-accent tracking-[0.3em]">01</p>
              <h3 className="font-display text-subsection text-foreground font-light italic tracking-[0.02em]">
                Premium Cotton
              </h3>
              <p className="text-body text-muted-foreground leading-[1.9]">
                Sourced from the finest long-staple cotton, each fibre is chosen for its softness, durability, and natural lustre.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="space-y-7">
              <p className="text-label text-accent tracking-[0.3em]">02</p>
              <h3 className="font-display text-subsection text-foreground font-light italic tracking-[0.02em]">
                Precision Tailoring
              </h3>
              <p className="text-body text-muted-foreground leading-[1.9]">
                Every seam is placed with intention. The fit is architectural — designed to drape, not cling, moving with the wearer in quiet harmony.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="space-y-7">
              <p className="text-label text-accent tracking-[0.3em]">03</p>
              <h3 className="font-display text-subsection text-foreground font-light italic tracking-[0.02em]">
                Timeless Design
              </h3>
              <p className="text-body text-muted-foreground leading-[1.9]">
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
