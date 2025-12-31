import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

const Shop = () => {
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
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm tracking-wide"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-body text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Premium Quality
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.08em] text-foreground">
              The Collection
            </h1>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body text-sm tracking-wide">
                No products available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {products.map((product, index) => {
                const image = product.node.images.edges[0]?.node;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);

                return (
                  <Link
                    key={product.node.id}
                    to={`/product/${product.node.handle}`}
                    className="group opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    {/* Product Image */}
                    <div className="aspect-square relative overflow-hidden mb-4 bg-secondary">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-body text-xs text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="text-center space-y-1">
                      <h3 className="font-body text-sm tracking-wide text-foreground group-hover:text-muted-foreground transition-colors">
                        {product.node.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        ₹{price.toFixed(0)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Shop;
