import shiforLogo from "@/assets/shifor-logo.png";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Left-aligned label */}
          <p className="text-label text-muted-foreground mb-8">
            About Us
          </p>
          
          <div className="grid md:grid-cols-[1fr,2fr] gap-12 md:gap-16 items-start">
            {/* Logo Column */}
            <div className="flex flex-col items-start space-y-6">
              <img 
                src={shiforLogo} 
                alt="shi-for mountain logo" 
                className="h-24 sm:h-32 w-auto invert dark:invert-0"
              />
              <h2 className="font-display text-section text-foreground">
                shi-for
              </h2>
            </div>
            
            {/* Content Column */}
            <div className="space-y-6 text-body text-muted-foreground font-light">
              <p>
                shi-for is a premium minimal clothing brand inspired by the raw beauty of mountains and everyday simplicity. We started with one goal — to create clean, high-quality plain white T-shirts that feel as good as they look.
              </p>
              <p>
                Our designs focus on minimal aesthetics, durable fabric, and a timeless fit that anyone can wear, anywhere. The mountain logo on our collar represents our core values: strength, freedom, and authenticity.
              </p>
              <p>
                At shi-for, we believe style doesn't need to be loud — it needs to be real, effortless, and built to last. This is only the beginning, and we're here to redefine basics with quality that speaks for itself.
              </p>
              <p className="font-display text-foreground text-xl md:text-2xl pt-4 leading-relaxed">
                Welcome to shi-for. Wear the calm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;