import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import ShopifyProductCard from "./ShopifyProductCard";
import { Loader2 } from "lucide-react";

const ShopifyShopSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts(50);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section id="shop" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Shop Collection
            </p>
            <h2 className="heading-display text-5xl md:text-6xl">
              ALL PRODUCTS
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="shop" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Shop Collection
            </p>
            <h2 className="heading-display text-5xl md:text-6xl">
              ALL PRODUCTS
            </h2>
          </div>
          <div className="text-center py-20 border border-dashed border-border">
            <p className="font-body text-muted-foreground mb-4">No products found</p>
            <p className="font-body text-sm text-muted-foreground">
              Products will appear here once added to your Shopify store
            </p>
          </div>
        </div>
      </section>
    );
  }

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
            <ShopifyProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopifyShopSection;
