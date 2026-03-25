const BrandMarquee = () => {
  const words = ["Purity", "Precision", "Presence", "Simplicity", "Discipline", "Craft", "Intention"];
  const repeat = [...words, ...words, ...words, ...words];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background overflow-hidden relative">
      {/* Top line */}
      <div className="section-divider mb-10 sm:mb-14" />
      
      {/* Primary marquee */}
      <div className="relative mb-4 sm:mb-6">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {repeat.map((word, i) => (
            <span key={`a-${i}`} className="inline-flex items-center">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground/[0.06] font-light italic mx-6 sm:mx-8 md:mx-12 select-none">
                {word}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/20 mx-2 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* Reverse marquee for depth */}
      <div className="relative opacity-50">
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center">
          {[...repeat].reverse().map((word, i) => (
            <span key={`b-${i}`} className="inline-flex items-center">
              <span className="font-display text-lg sm:text-xl md:text-2xl text-foreground/[0.04] font-light mx-4 sm:mx-6 md:mx-8 select-none">
                {word}
              </span>
              <span className="w-1 h-1 rounded-full bg-accent/10 mx-2 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom line */}
      <div className="section-divider mt-10 sm:mt-14" />
    </section>
  );
};

export default BrandMarquee;
