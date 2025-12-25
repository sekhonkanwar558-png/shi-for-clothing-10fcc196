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
      <section id="shop" className="min-h-screen py-24 sm:py-32 bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          <p className="font-body text-xs tracking-[0.2em] text-muted-foreground uppercase">Loading</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="min-h-screen py-24 sm:py-32 bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">{error}</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="shop" className="min-h-screen py-24 sm:py-32 bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">No products available</p>
      </section>
    );
  }

  return (
    <section id="shop" className="min-h-screen py-20 sm:py-28 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 opacity-0 animate-fade-in">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground uppercase mb-3 sm:mb-4">
            Premium Quality
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.08em] sm:tracking-[0.1em] text-foreground">
            The Collection
          </h2>
        </div>

        <div className="max-w-sm sm:max-w-md mx-auto">
          {products.map((product, index) => (
            <ShopifyProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopifyShopSection;