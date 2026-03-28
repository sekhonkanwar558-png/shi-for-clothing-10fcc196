import { Reveal } from "@/hooks/useScrollReveal";

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="section-padding bg-background">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto">
          {/* Section label */}
          <Reveal>
            <p className="text-label text-muted-foreground tracking-[0.3em] text-center mb-6">
              Philosophy
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="w-12 h-px bg-accent mx-auto mb-16 sm:mb-20" />
          </Reveal>

          {/* Main heading */}
          <Reveal delay={200}>
            <h2 className="font-display text-section text-foreground font-light italic tracking-[0.02em] text-center mb-14 sm:mb-18">
              The Beauty of Less
            </h2>
          </Reveal>

          {/* Intro */}
          <Reveal delay={300} direction="left">
            <p className="text-body text-muted-foreground leading-[2] mb-10 sm:mb-14">
              In a world that moves fast, collects more, and forgets quickly — we choose to slow down.
            </p>
          </Reveal>

          <Reveal delay={400} direction="right">
            <p className="text-body text-muted-foreground leading-[2] mb-16 sm:mb-20">
              Rooted in the Japanese philosophy of <em className="font-display text-foreground not-italic">wabi-sabi</em>, we find beauty not in excess, but in essence. Not in perfection, but in honesty.
            </p>
          </Reveal>

          {/* Why Only White */}
          <Reveal delay={100}>
            <div className="w-8 h-px bg-accent/40 mx-auto mb-14 sm:mb-18" />
          </Reveal>

          <Reveal delay={200}>
            <h3 className="font-display text-subsection text-foreground font-light italic tracking-[0.02em] text-center mb-10 sm:mb-14">
              Why Only White?
            </h3>
          </Reveal>

          <div className="space-y-6 sm:space-y-8 mb-16 sm:mb-20">
            <Reveal delay={100} direction="left">
              <p className="text-body text-muted-foreground leading-[2]">
                White is not empty. It is complete.
              </p>
            </Reveal>
            <Reveal delay={200} direction="right">
              <p className="text-body text-muted-foreground leading-[2]">
                It does not compete. It does not demand attention. It simply exists — quietly, confidently.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-body text-muted-foreground leading-[2]">
                A white t-shirt is the most honest form of clothing. No distractions. No noise. Just form, fabric, and feeling.
              </p>
            </Reveal>
          </div>

          {/* Fewer Better Things */}
          <Reveal delay={100}>
            <div className="w-8 h-px bg-accent/40 mx-auto mb-14 sm:mb-18" />
          </Reveal>

          <Reveal delay={200}>
            <h3 className="font-display text-subsection text-foreground font-light italic tracking-[0.02em] text-center mb-10 sm:mb-14">
              Fewer, Better Things
            </h3>
          </Reveal>

          <div className="space-y-6 sm:space-y-8 mb-16 sm:mb-20">
            <Reveal delay={100} direction="left">
              <p className="text-body text-muted-foreground leading-[2]">
                We don't believe in collections. We don't believe in trends.
              </p>
            </Reveal>
            <Reveal delay={200} direction="right">
              <p className="text-body text-muted-foreground leading-[2]">
                We believe in owning less — but owning better.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-body text-muted-foreground leading-[2]">
                Every piece we create is an attempt to reach the purest version of something essential. Not more options. Just the right one.
              </p>
            </Reveal>
          </div>

          {/* Closing */}
          <Reveal delay={200}>
            <div className="w-12 h-px bg-accent mx-auto mb-12 sm:mb-16" />
          </Reveal>

          <Reveal delay={400}>
            <p className="font-display text-foreground text-lg sm:text-xl md:text-2xl italic font-light tracking-[0.02em] text-center leading-[1.6]">
              "Wear less. Mean more."
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
