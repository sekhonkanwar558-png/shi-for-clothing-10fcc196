import onigiriLogo from "@/assets/onigiri-logo.png";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const RevealBlock = ({ 
  children, 
  delay = 0, 
  direction = "up" 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  direction?: "up" | "left" | "right";
}) => {
  const { ref, isVisible } = useScrollReveal();
  
  const transforms = {
    up: 'translateY(40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
  };

  return (
    <div
      ref={ref}
      className="transition-all duration-[1200ms] ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transforms[direction],
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo centered */}
          <RevealBlock>
            <div className="mb-14">
              <img 
                src={onigiriLogo} 
                alt="shi-for" 
                className="h-20 sm:h-24 w-auto mx-auto"
              />
            </div>
          </RevealBlock>

          {/* Brand name */}
          <RevealBlock delay={150}>
            <h2 className="font-display text-section text-foreground font-light italic tracking-[0.03em] mb-10">
              shi-for
            </h2>
          </RevealBlock>

          {/* Gold line */}
          <RevealBlock delay={300}>
            <div className="w-12 h-px bg-accent mx-auto mb-12" />
          </RevealBlock>

          {/* Values */}
          <RevealBlock delay={400}>
            <p className="text-label text-accent tracking-[0.3em] mb-20">
              Simplicity · Discipline · Craft · Intention
            </p>
          </RevealBlock>

          {/* Narrative */}
          <div className="space-y-8 max-w-2xl mx-auto text-left">
            <RevealBlock delay={0}>
              <p className="text-body text-muted-foreground leading-[1.9]">
                Born from a reverence for Japanese craftsmanship and the philosophy of wabi-sabi — finding beauty in simplicity — shi-for exists to perfect one essential garment.
              </p>
            </RevealBlock>
            
            <RevealBlock delay={100}>
              <p className="text-body text-muted-foreground leading-[1.9]">
                We believe in the power of restraint. Every stitch, every thread, every detail is considered with the same precision that defines the finest Japanese artisans.
              </p>
            </RevealBlock>
            
            <RevealBlock delay={200}>
              <p className="text-body text-muted-foreground leading-[1.9]">
                Our white t-shirt is not merely clothing. It is a canvas of intention. A garment forged in stoicism, inspired by the discipline of Japanese culture, and created to evolve humanity in peace.
              </p>
            </RevealBlock>
            
            <RevealBlock delay={300}>
              <p className="font-display text-foreground text-xl md:text-2xl pt-6 leading-[1.5] italic font-light tracking-[0.02em] text-center">
                "From inspiration into reality — authored with purpose, worn with meaning."
              </p>
            </RevealBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
