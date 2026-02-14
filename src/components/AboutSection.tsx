import onigiriLogo from "@/assets/onigiri-logo.png";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-20 md:mb-28">
            <p className="text-label text-muted-foreground tracking-[0.3em] mb-8">
              The Philosophy
            </p>
            <div className="w-12 h-px bg-accent mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* Left Column */}
            <div className="flex flex-col items-center md:items-start space-y-10">
              <img 
                src={onigiriLogo} 
                alt="shi-for" 
                className="h-24 sm:h-32 w-auto"
              />
              <h2 className="font-display text-section text-foreground font-light italic tracking-[0.03em]">
                shi-for
              </h2>
              <div className="w-12 h-px bg-accent" />
              <p className="text-label text-accent tracking-[0.3em]">
                Simplicity · Discipline · Craft · Intention
              </p>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8 text-body text-muted-foreground leading-[1.9]">
              <p>
                Born from a reverence for Japanese craftsmanship and the philosophy of wabi-sabi — finding beauty in simplicity — shi-for exists to perfect one essential garment.
              </p>
              <p>
                We believe in the power of restraint. Every stitch, every thread, every detail is considered with the same precision that defines the finest Japanese artisans.
              </p>
              <p>
                Our white t-shirt is not merely clothing. It is a canvas of intention. A garment forged in stoicism, inspired by the discipline of Japanese culture, and created to evolve humanity in peace.
              </p>
              <p className="font-display text-foreground text-xl md:text-2xl pt-6 leading-[1.5] italic font-light tracking-[0.02em]">
                "From inspiration into reality — authored with purpose, worn with meaning."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
