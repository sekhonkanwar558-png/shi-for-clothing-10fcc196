import onigiriLogo from "@/assets/onigiri-logo.png";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="text-center mb-16 md:mb-24">
            <p className="text-label text-muted-foreground mb-6">
              The Philosophy
            </p>
            <div className="accent-line mx-auto" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            {/* Left Column — Brand mark & name */}
            <div className="flex flex-col items-center md:items-start space-y-8">
              <img 
                src={onigiriLogo} 
                alt="shi-for" 
                className="h-20 sm:h-28 w-auto"
              />
              <h2 className="font-display text-section text-foreground font-light italic">
                shi-for
              </h2>
              <div className="accent-line" />
              <p className="text-label text-accent">
                Simplicity · Discipline · Craft · Intention
              </p>
            </div>
            
            {/* Right Column — Narrative */}
            <div className="space-y-8 text-body text-muted-foreground">
              <p>
                Born from a reverence for Japanese craftsmanship and the philosophy of wabi-sabi — finding beauty in simplicity — shi-for exists to perfect one essential garment.
              </p>
              <p>
                We believe in the power of restraint. Every stitch, every thread, every detail is considered with the same precision that defines the finest Japanese artisans.
              </p>
              <p>
                Our white t-shirt is not merely clothing. It is a canvas of intention. A garment forged in stoicism, inspired by the discipline of Japanese culture, and created to evolve humanity in peace.
              </p>
              <p className="font-display text-foreground text-xl md:text-2xl pt-4 leading-relaxed italic font-light">
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
