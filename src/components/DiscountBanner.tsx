const DiscountBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-2.5">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-block">
            <span className="inline-block mx-10 text-[9px] tracking-[0.3em] uppercase font-light">
              Use code <span className="font-normal text-accent">SHINEW</span> for 20% off
            </span>
            <span className="inline-block mx-6 text-[9px] tracking-[0.3em] uppercase text-background/30">·</span>
            <span className="inline-block mx-10 text-[9px] tracking-[0.3em] uppercase font-light">Free shipping on orders over ₹999</span>
            <span className="inline-block mx-6 text-[9px] tracking-[0.3em] uppercase text-background/30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DiscountBanner;
