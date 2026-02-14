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

  const handleImageLoad = (productId: string) => {
    setImagesLoaded(prev => ({ ...prev, [productId]: true }));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-16">
          {/* Header */}
          <div className="max-w-4xl mb-16 md:mb-20">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 text-label tracking-[0.2em]"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14 md:gap-x-10 md:gap-y-20">
              {products.map((product, index) => {
                const image = product.node.images.edges[0]?.node;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const productId = product.node.id;
                const isLoaded = imagesLoaded[productId];

                return (
                  <Link
                    key={productId}
                    to={`/product/${product.node.handle}`}
                    className="group opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden mb-5 bg-muted transition-shadow duration-700 ease-out group-hover:shadow-lg">
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

                    <div className="space-y-2">
                      <h3 className="text-body font-normal text-foreground group-hover:text-muted-foreground transition-colors duration-500">
                        {product.node.title}
                      </h3>
                      <p className="text-micro text-muted-foreground">
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
