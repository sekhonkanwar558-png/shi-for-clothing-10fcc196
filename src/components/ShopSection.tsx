import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ShopSection = () => {
  return (
    <section id="shop" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Shop Collection
          </p>
          <h2 className="heading-display text-5xl md:text-6xl">
            ALL PRODUCTS
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
