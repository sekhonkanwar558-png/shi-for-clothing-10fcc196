const BrandMarquee = () => {
  const words = ["🔥PURITY🔥", "💪PRECISION💪", "👁PRESENCE👁", "⭐SIMPLICITY⭐", "🎯DISCIPLINE🎯", "🛠CRAFT🛠", "💡INTENTION💡"];
  const repeat = [...words, ...words, ...words, ...words];

  return (
    <section className="py-6 sm:py-8 overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
      }}
    >
      <div className="relative">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {repeat.map((word, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold mx-4 sm:mx-6"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  color: 'hsl(var(--primary-foreground))',
                  textShadow: '2px 2px 0px hsl(var(--foreground))',
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
