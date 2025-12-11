const shopItems = [
  { id: 1, category: "HOODIES" },
  { id: 2, category: "TEES" },
  { id: 3, category: "PANTS" },
  { id: 4, category: "JACKETS" },
  { id: 5, category: "ACCESSORIES" },
  { id: 6, category: "LIMITED" },
];

const ShopPreview = () => {
  return (
    <section id="shop" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] text-primary uppercase mb-4">
            Explore
          </p>
          <h2 className="heading-display text-5xl md:text-6xl">
            SHOP THE DESTRUCTION
          </h2>
        </div>

        {/* Shop Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shopItems.map((item, index) => (
            <a
              key={item.id}
              href="#"
              className="group relative aspect-[4/5] placeholder-box overflow-hidden animate-slide-up hover:border-primary/50 transition-all"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 border border-dashed border-muted-foreground/30 mb-4 group-hover:border-primary/50 transition-colors" />
                <span className="font-body text-xs tracking-[0.15em]">
                  PRODUCT IMAGE
                  <br />
                  <span className="text-muted-foreground/70">To Be Uploaded Later</span>
                </span>
              </div>

              {/* Category Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                <p className="font-display text-2xl group-hover:text-primary transition-colors">
                  {item.category}
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Corner accent on hover */}
              <div className="absolute top-4 right-4 w-0 h-0 border-t-[20px] border-r-[20px] border-t-primary border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center justify-center px-12 py-4 border border-primary text-primary font-display text-xl tracking-wider hover:bg-primary hover:text-primary-foreground transition-all"
          >
            ENTER THE SHOP
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShopPreview;
