import onigiriLogo from "@/assets/onigiri-logo.png";
import { Reveal } from "@/hooks/useScrollReveal";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-card"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, hsl(300 100% 50% / 0.1) 20px, hsl(300 100% 50% / 0.1) 40px)',
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="mb-8">
              <img 
                src={onigiriLogo} 
                alt="shi-for" 
                className="h-20 sm:h-28 md:h-32 w-auto mx-auto animate-rainbow"
                style={{
                  border: '4px dashed hsl(var(--primary))',
                  padding: '10px',
                  animation: 'wobble 0.4s ease-in-out infinite alternate, rainbow 3s linear infinite',
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-section text-foreground mb-4">
              ✨ shi-for ✨
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div className="w-32 h-1 mx-auto mb-6" 
              style={{ background: 'linear-gradient(90deg, red, orange, yellow, green, blue, purple)' }} 
            />
          </Reveal>

          <Reveal delay={300}>
            <p className="text-label text-primary tracking-widest mb-8 animate-blink">
              ⚡ Simplicity · Discipline · Craft · Intention ⚡
            </p>
          </Reveal>

          <div className="space-y-4 max-w-2xl mx-auto text-left">
            <Reveal delay={0} direction="left">
              <p className="text-body text-foreground p-4 border-2 border-dashed border-accent"
                style={{ transform: 'rotate(-1deg)', background: 'hsl(var(--muted) / 0.5)' }}
              >
                🏯 Born from a reverence for Japanese craftsmanship and the philosophy of wabi-sabi — finding beauty in simplicity — shi-for exists to perfect one essential garment.
              </p>
            </Reveal>
            
            <Reveal delay={100} direction="right">
              <p className="text-body text-foreground p-4 border-2 border-dotted border-primary"
                style={{ transform: 'rotate(1deg)', background: 'hsl(var(--secondary) / 0.3)' }}
              >
                🧵 We believe in the power of restraint. Every stitch, every thread, every detail is considered with the same precision that defines the finest Japanese artisans.
              </p>
            </Reveal>
            
            <Reveal delay={200} direction="left">
              <p className="text-body text-foreground p-4 border-2 border-dashed border-secondary"
                style={{ transform: 'rotate(-0.5deg)', background: 'hsl(var(--accent) / 0.2)' }}
              >
                👕 Our white t-shirt is not merely clothing. It is a canvas of intention. A garment forged in stoicism, inspired by the discipline of Japanese culture, and created to evolve humanity in peace.
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="text-center p-6 mt-4 border-4 border-double border-primary"
                style={{ background: 'hsl(var(--card))', transform: 'rotate(1deg)' }}
              >
                <p className="text-xl font-bold text-primary animate-rainbow">
                  💎 "From inspiration into reality — authored with purpose, worn with meaning." 💎
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
