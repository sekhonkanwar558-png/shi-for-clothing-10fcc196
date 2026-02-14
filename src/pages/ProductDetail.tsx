import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft, Plus, Minus, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { storefrontApiRequest, ShopifyProduct, createStorefrontCheckout } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore((state) => state.addItem);
  
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        setLoading(true);
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (data?.data?.productByHandle) {
          setProduct(data.data.productByHandle);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setMounted(true), 100);
      }
    };

    loadProduct();
  }, [handle]);

  useEffect(() => {
    setImageLoaded(false);
  }, [selectedImageIndex]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh] pt-16">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-[60vh] pt-16 gap-8">
          <p className="text-muted-foreground text-body">Product not found</p>
          <Link to="/shop" className="btn-secondary">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = selectedVariantIndex !== null ? variants[selectedVariantIndex]?.node : null;
  const price = parseFloat(selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount);
  const compareAtPriceValue = selectedVariant?.compareAtPrice 
    ? parseFloat(selectedVariant.compareAtPrice.amount) 
    : product.compareAtPriceRange?.minVariantPrice 
      ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) 
      : null;
  const compareAtPrice = compareAtPriceValue && compareAtPriceValue > 0 && compareAtPriceValue > price 
    ? compareAtPriceValue 
    : null;

  const sizeOption = product.options.find(opt => opt.name.toLowerCase() === "size");
  const sizes = sizeOption?.values || [];

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSizeSelect = (size: string) => {
    const variantIndex = variants.findIndex(v => 
      v.node.selectedOptions.some(opt => opt.value === size)
    );
    if (variantIndex !== -1) {
      setSelectedVariantIndex(variantIndex);
    }
  };

  const getSelectedSize = () => {
    return selectedVariant?.selectedOptions.find(opt => opt.name.toLowerCase() === "size")?.value;
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a size");
      return;
    }

    setIsAddingToCart(true);
    
    setTimeout(() => {
      addItem({
        product: { node: product } as ShopifyProduct,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity: quantity,
        selectedOptions: selectedVariant.selectedOptions,
      });
      
      toast.success(`${quantity} × ${product.title} added to cart`, {
        position: "top-center",
      });
      
      setIsAddingToCart(false);
    }, 200);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      toast.error("Please select a size");
      return;
    }

    setIsBuyingNow(true);
    try {
      const checkoutUrl = await createStorefrontCheckout([
        { variantId: selectedVariant.id, quantity: quantity }
      ]);
      
      if (checkoutUrl) {
        if (isMobileDevice()) {
          window.location.href = checkoutUrl;
        } else {
          window.open(checkoutUrl, "_blank");
        }
      } else {
        toast.error("Failed to create checkout. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-32">
        <div className="container mx-auto px-5 sm:px-8 lg:px-16">
          {/* Back Link */}
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-500 mb-6 sm:mb-8 md:mb-12 text-label tracking-[0.2em]"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back
          </Link>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(25px)',
            }}
          >
            {/* Left: Image Gallery */}
            <div className="space-y-3 sm:space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-muted overflow-hidden group">
                {images[selectedImageIndex] && (
                  <img
                    src={images[selectedImageIndex].node.url}
                    alt={images[selectedImageIndex].node.altText || product.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                    }`}
                  />
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-2 text-foreground/30 hover:text-foreground transition-all duration-500 opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-2 text-foreground/30 hover:text-foreground transition-all duration-500 opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} strokeWidth={1.5} />
                    </button>
                  </>
                )}

                {/* Mobile swipe dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                          selectedImageIndex === index ? "bg-foreground w-4" : "bg-foreground/30"
                        }`}
                        aria-label={`Image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip — desktop only */}
              {images.length > 1 && (
                <div className="hidden lg:flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden transition-all duration-500 ${
                        selectedImageIndex === index ? "opacity-100 ring-1 ring-accent" : "opacity-30 hover:opacity-60"
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6 sm:space-y-8">
              {/* Title & Price */}
              <div className="space-y-4">
                <h1 className="font-display text-section text-foreground font-light">
                  {product.title}
                </h1>
                <div className="flex items-baseline gap-3">
                  {compareAtPrice && (
                    <span className="text-body text-muted-foreground line-through">
                      ₹{Math.round(compareAtPrice).toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-2xl md:text-3xl font-display text-foreground font-light">
                    ₹{Math.round(price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="space-y-4">
                  <p className="text-label text-muted-foreground tracking-[0.2em]">Size</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {sizes.map((size) => {
                      const variantForSize = variants.find(v => 
                        v.node.selectedOptions.some(opt => opt.value === size)
                      );
                      const isAvailable = variantForSize?.node.availableForSale ?? false;
                      const isSelected = getSelectedSize() === size;
                      
                      return (
                        <button
                          key={size}
                          onClick={() => isAvailable && handleSizeSelect(size)}
                          disabled={!isAvailable}
                          className={`px-4 sm:px-5 py-2.5 sm:py-3 text-xs tracking-[0.1em] uppercase transition-all duration-500 touch-manipulation active:scale-[0.96] ${
                            isSelected
                              ? "bg-foreground text-background"
                              : isAvailable
                                ? "bg-transparent border border-foreground/15 text-foreground hover:border-foreground/40"
                                : "bg-transparent border border-foreground/8 text-muted-foreground/40 cursor-not-allowed line-through"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-6 sm:gap-8">
                <p className="text-label text-muted-foreground tracking-[0.2em]">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 border border-foreground/15 text-foreground hover:border-foreground/40 transition-all duration-500 touch-manipulation active:scale-[0.94]"
                  >
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="text-body font-normal min-w-[32px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 border border-foreground/15 text-foreground hover:border-foreground/40 transition-all duration-500 touch-manipulation active:scale-[0.94]"
                  >
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || isAddingToCart}
                  className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-transform"
                >
                  {isAddingToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Adding...
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant || isBuyingNow}
                  className="flex-1 btn-secondary disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] transition-transform"
                >
                  {isBuyingNow ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>

              {/* Stock Status */}
              {selectedVariant && (
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedVariant.availableForSale ? "bg-green-600" : "bg-red-400"}`} />
                  <span className="text-label text-muted-foreground tracking-[0.15em]">
                    {selectedVariant.availableForSale ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              )}

              {/* Collapsible Sections */}
              <div className="pt-4 sm:pt-6 space-y-0 border-t border-border/50">
                <Collapsible open={productDetailsOpen} onOpenChange={setProductDetailsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-4 sm:py-5 text-label tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors duration-500">
                    <span>Product Details</span>
                    <Plus size={12} strokeWidth={1.5} className={`transition-transform duration-500 ${productDetailsOpen ? "rotate-45" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-4 sm:pb-5">
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {product.description || "Premium quality crafted with attention to detail."}
                    </p>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={shippingOpen} onOpenChange={setShippingOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-4 sm:py-5 border-t border-border/50 text-label tracking-[0.2em] text-foreground hover:text-muted-foreground transition-colors duration-500">
                    <span>Shipping & Returns</span>
                    <Plus size={12} strokeWidth={1.5} className={`transition-transform duration-500 ${shippingOpen ? "rotate-45" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-4 sm:pb-5">
                    <div className="text-body text-muted-foreground leading-relaxed space-y-2">
                      <p>Free shipping on orders over ₹999</p>
                      <p>Standard delivery: 5-7 business days</p>
                      <p>Easy returns within 7 days</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default ProductDetail;
