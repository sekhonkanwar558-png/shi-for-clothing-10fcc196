import { Reveal } from "@/hooks/useScrollReveal";

const pillars = [
  {
    num: "01",
    title: "Premium Cotton",
    desc: "Sourced from the finest long-staple cotton, each fibre is chosen for its softness, durability, and natural lustre.",
  },
  {
    num: "02",
    title: "Precision Tailoring",
    desc: "Every seam is placed with intention. The fit is architectural — designed to drape, not cling, moving with the wearer in quiet harmony.",
  },
  {
    num: "03",
    title: "Timeless Design",
    desc: "We reject trends. Our garments are built to endure — not just in fabric, but in relevance. A white t-shirt that transcends time.",
  },
];

const CraftsmanshipSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <Reveal>
            <div className="text-center mb-16 sm:mb-20 md:mb-28">
              <p className="text-label text-muted-foreground tracking-[0.3em] mb-8">
                Craftsmanship
              </p>
              <div className="w-12 h-px bg-accent mx-auto" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10 md:gap-14 text-center">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.num} delay={i * 200}>
                <div className="space-y-5 sm:space-y-7">
                  <p className="text-label text-accent tracking-[0.3em]">{pillar.num}</p>
                  <h3 className="font-display text-subsection text-foreground font-light italic tracking-[0.02em]">
                    {pillar.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-[1.9]">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
