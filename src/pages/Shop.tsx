import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InstagramButton from "@/components/InstagramButton";
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
          <div 
            className="max-w-4xl mb-8 sm:mb-12"
            style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.2s' }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary font-bold mb-6 text-label tracking-widest"
            >
              <ArrowLeft size={18} strokeWidth={2} />
              ← GO BACK
            </Link>
            
            <h1 className="text-hero text-foreground animate-rainbow">
              🛒 SHOP 🛒
            </h1>
            
            <p className="text-primary font-bold mt-2 animate-blink text-sm">
              ⚡ HOT DEALS BELOW ⚡
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-primary font-bold animate-blink">LOADING AWESOME STUFF...</span>
            </div>
          ) : error ? (
            <div className="text-center py-24 border-4 border-dashed border-primary p-8">
              <p className="text-primary font-bold text-xl">😢 {error} 😢</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 border-4 border-dotted border-accent p-8">
              <p className="text-foreground font-bold text-xl">
                🚫 No products available at the moment. Check back soon!!! 🚫
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product, index) => {
                const image = product.node.images.edges[0]?.node;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const productId = product.node.id;
                const isLoaded = imagesLoaded[productId];

                return (
                  <Link
                    key={productId}
                    to={`/product/${product.node.handle}`}
                    className="group border-4 border-dashed border-accent p-2 hover:border-primary transition-all duration-200"
                    style={{ 
                      opacity: mounted ? 1 : 0,
                      transform: `rotate(${(index % 3 - 1) * 1.5}deg)`,
                      background: 'hsl(var(--card))',
                      boxShadow: 'var(--shadow-md)',
                      transition: 'opacity 0.2s',
                      transitionDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden mb-2 bg-muted border-2 border-dotted border-primary">
                      {image && (
                        <img
                          src={image.url}
                          alt={image.altText || product.node.title}
                          onLoad={() => handleImageLoad(productId)}
                          className={`w-full h-full object-cover transition-all duration-200 group-hover:scale-110 ${
                            isLoaded ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ filter: 'saturate(1.5)' }}
                          loading="lazy"
                        />
                      )}
                      {!image && (
                        <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                          <span className="text-2xl">📷</span>
                        </div>
                      )}
                      
                      {/* Sale badge */}
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold animate-blink"
                        style={{ transform: 'rotate(5deg)' }}
                      >
                        HOT! 🔥
                      </div>
                    </div>

                    <div className="space-y-1 text-center p-2">
                      <h3 className="text-sm font-bold text-foreground truncate">
                        {product.node.title}
                      </h3>
                      <p className="text-lg font-bold text-primary">
                        💰 ₹{Math.round(price).toLocaleString('en-IN')} 💰
                      </p>
                      <p className="text-xs text-accent font-bold">
                        ⭐⭐⭐⭐⭐ BEST SELLER
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
      <InstagramButton />
    </main>
  );
};

export default Shop;
