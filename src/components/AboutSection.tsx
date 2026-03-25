import onigiriLogo from "@/assets/onigiri-logo.png";
import { Reveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background relative grain-overlay">
      <div className="container mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo centered */}
          <Reveal>
            <div className="mb-12 sm:mb-14">
              <img 
                src={onigiriLogo} 
                alt="shi-for" 
                className="h-16 sm:h-20 md:h-24 w-auto mx-auto opacity-80"
              />
            </div>
          </Reveal>

          {/* Brand name */}
          <Reveal delay={150}>
            <h2 className="font-display text-section text-foreground font-light italic tracking-[0.03em] mb-8 sm:mb-10">
              shi-for
            </h2>
          </Reveal>

          {/* Gold line */}
          <Reveal delay={300}>
            <div className="accent-line mx-auto mb-10 sm:mb-12" />
          </Reveal>

          {/* Values */}
          <Reveal delay={400}>
            <p className="text-label text-accent tracking-[0.35em] mb-16 sm:mb-20">
              Simplicity · Discipline · Craft · Intention
            </p>
          </Reveal>

          {/* Narrative */}
          <div className="space-y-8 sm:space-y-10 max-w-2xl mx-auto text-left">
            <Reveal delay={0} direction="left">
              <p className="text-body text-muted-foreground leading-[2]">
                Born from a reverence for Japanese craftsmanship and the philosophy of wabi-sabi — finding beauty in simplicity — shi-for exists to perfect one essential garment.
              </p>
            </Reveal>
            
            <Reveal delay={100} direction="right">
              <p className="text-body text-muted-foreground leading-[2]">
                We believe in the power of restraint. Every stitch, every thread, every detail is considered with the same precision that defines the finest Japanese artisans.
              </p>
            </Reveal>
            
            <Reveal delay={200} direction="left">
              <p className="text-body text-muted-foreground leading-[2]">
                Our white t-shirt is not merely clothing. It is a canvas of intention. A garment forged in stoicism, inspired by the discipline of Japanese culture, and created to evolve humanity in peace.
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="pt-6 sm:pt-8">
                <div className="accent-line mx-auto mb-6 sm:mb-8" />
                <p className="font-display text-foreground text-lg sm:text-xl md:text-2xl leading-[1.5] italic font-light tracking-[0.02em] text-center">
                  "From inspiration into reality — authored with purpose, worn with meaning."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
