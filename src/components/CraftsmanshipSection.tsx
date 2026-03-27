import { Reveal } from "@/hooks/useScrollReveal";

const pillars = [
  {
    num: "01",
    title: "Premium Cotton",
    desc: "Sourced from the finest long-staple cotton, each fibre is chosen for its softness, durability, and natural lustre.",
    emoji: "🌿",
  },
  {
    num: "02",
    title: "Precision Tailoring",
    desc: "Every seam is placed with intention. The fit is architectural — designed to drape, not cling, moving with the wearer in quiet harmony.",
    emoji: "✂️",
  },
  {
    num: "03",
    title: "Timeless Design",
    desc: "We reject trends. Our garments are built to endure — not just in fabric, but in relevance. A white t-shirt that transcends time.",
    emoji: "⏰",
  },
];

const CraftsmanshipSection = () => {
  return (
    <section className="section-padding bg-secondary"
      style={{
        backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 15px, hsl(var(--primary) / 0.1) 15px, hsl(var(--primary) / 0.1) 30px)',
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-label text-primary tracking-widest mb-4 animate-blink">
                ⚒️ CRAFTSMANSHIP ⚒️
              </p>
              <div className="w-32 h-1 mx-auto"
                style={{ background: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)' }}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.num} delay={i * 150}>
                <div className="p-6 text-center border-3 border-dashed border-accent"
                  style={{
                    background: 'hsl(var(--card))',
                    transform: `rotate(${(i - 1) * 2}deg)`,
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <p className="text-4xl mb-3">{pillar.emoji}</p>
                  <p className="text-2xl font-bold text-primary mb-2">{pillar.num}</p>
                  <h3 className="text-subsection text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-body text-foreground">
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
