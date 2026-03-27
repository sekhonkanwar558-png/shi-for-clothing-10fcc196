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
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

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
        setTimeout(() => setMounted(true), 100);
      }
    };

    loadProducts();
  }, []);

  const handleImageLoad = (productId: string) => {
    setImagesLoaded(prev => ({ ...prev, [productId]: true }));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          {/* Header */}
          <div 
            className="max-w-4xl mb-12 sm:mb-16 md:mb-20 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-500 mb-8 sm:mb-10 text-label tracking-[0.2em]"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back
            </Link>
            
            <h1 className="font-display text-section text-foreground font-light italic tracking-[0.02em]">
              Shop
            </h1>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-body">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-body">
                No products available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-14 md:gap-x-10 md:gap-y-20">
              {products.map((product, index) => {
                const image = product.node.images.edges[0]?.node;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const productId = product.node.id;
                const isLoaded = imagesLoaded[productId];

                return (
                  <Link
                    key={productId}
                    to={`/product/${product.node.handle}`}
                    className="group transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ 
                      opacity: mounted ? 1 : 0, 
                      transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                      transitionDelay: `${200 + index * 100}ms`,
                    }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden mb-3 sm:mb-5 bg-muted transition-shadow duration-700 ease-out group-hover:shadow-lg">
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          onLoad={() => handleImageLoad(productId)}
                          className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] ${
                            isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                          }`}
                          loading="lazy"
                        />
                      )}
                      {!image && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-micro text-muted-foreground">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-xs sm:text-body font-normal text-foreground group-hover:text-muted-foreground transition-colors duration-700 truncate">
                        {product.node.title}
                      </h3>
                      <p className="text-[11px] sm:text-micro text-muted-foreground">
                        ₹{Math.round(price).toLocaleString('en-IN')}
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
