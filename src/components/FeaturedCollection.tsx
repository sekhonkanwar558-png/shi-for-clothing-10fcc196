const products = [
  { id: 1, name: "PHANTOM HOODIE", category: "HOODIE", price: "$180" },
  { id: 2, name: "SHATTER TEE", category: "TEE", price: "$85" },
  { id: 3, name: "VOID CARGO", category: "CARGO", price: "$220" },
  { id: 4, name: "CHAOS JACKET", category: "JACKET", price: "$350" },
];

const FeaturedCollection = () => {
  return (
    <section id="featured" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="font-body text-sm tracking-[0.3em] text-primary uppercase mb-4">
              New Arrivals
            </p>
            <h2 className="heading-display text-5xl md:text-6xl">
              FEATURED COLLECTION
            </h2>
          </div>
          <a
            href="#shop"
            className="font-body text-sm tracking-widest text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
          >
            VIEW ALL PRODUCTS →
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image Placeholder */}
              <div className="aspect-[3/4] placeholder-box relative overflow-hidden mb-4 group-hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 border border-dashed border-muted-foreground/40 mb-4" />
                  <span className="font-body text-xs tracking-[0.15em] leading-relaxed">
                    PRODUCT IMAGE HERE
                    <br />
                    <span className="text-primary/70">({product.category})</span>
                  </span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <p className="font-body text-xs tracking-[0.2em] text-muted-foreground">
                  {product.category}
                </p>
                <h3 className="font-display text-xl group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="font-body text-lg text-foreground">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
