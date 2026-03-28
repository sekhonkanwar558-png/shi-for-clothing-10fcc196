import { Reveal } from "@/hooks/useScrollReveal";

const BrandMarquee = () => {
  const words = ["Purity", "Precision", "Presence", "Simplicity", "Discipline", "Craft", "Intention"];
  const repeat = [...words, ...words, ...words, ...words];

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-background overflow-hidden">
      <div className="relative">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {repeat.map((word, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground/8 font-light italic mx-6 sm:mx-8 md:mx-12">
                {word}
              </span>
              <span className="w-1 h-1 rounded-full bg-accent/30 mx-2" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
