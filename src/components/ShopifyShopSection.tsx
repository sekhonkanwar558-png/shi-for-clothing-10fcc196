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
      <section id="shop" className="py-32 bg-background">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="shop" className="py-32 bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="font-body text-muted-foreground">{error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="shop" className="py-32 bg-background">
        <div className="container mx-auto px-6 text-center">
          <p className="font-body text-muted-foreground">No products available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] text-muted-foreground uppercase mb-4">
            Collection
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light tracking-[0.1em] text-foreground">
            The Essentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <ShopifyProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopifyShopSection;
