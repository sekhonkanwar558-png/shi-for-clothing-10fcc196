import shiforLogo from "@/assets/shifor-logo.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase">
            About Us
          </p>
          
          <img 
            src={shiforLogo} 
            alt="shi-for mountain logo" 
            className="h-20 sm:h-28 w-auto mx-auto invert dark:invert-0"
          />
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.08em] text-foreground">
            shi-for
          </h2>
          
          <div className="space-y-6 font-body text-sm sm:text-base text-muted-foreground leading-relaxed font-light">
            <p>
              shi-for is a premium minimal clothing brand inspired by the raw beauty of mountains and everyday simplicity. We started with one goal — to create clean, high-quality plain white T-shirts that feel as good as they look.
            </p>
            <p>
              Our designs focus on minimal aesthetics, durable fabric, and a timeless fit that anyone can wear, anywhere. The mountain logo on our collar represents our core values: strength, freedom, and authenticity.
            </p>
            <p>
              At shi-for, we believe style doesn't need to be loud — it needs to be real, effortless, and built to last. This is only the beginning, and we're here to redefine basics with quality that speaks for itself.
            </p>
            <p className="font-display text-foreground text-lg sm:text-xl tracking-[0.1em] pt-4">
              Welcome to shi-for. Wear the calm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
