import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowLeft, Plus, Minus, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import DiscountBanner from "@/components/DiscountBanner";
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
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

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
      }
    };

    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <DiscountBanner />
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh] pt-16">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <DiscountBanner />
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-[60vh] pt-16 gap-4">
          <p className="text-muted-foreground">Product not found</p>
          <Link to="/shop" className="text-foreground underline underline-offset-4">
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
  // Only show compare price if it's greater than 0 and different from current price
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
      <DiscountBanner />
      <Navbar />
      
      <section className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8 font-body text-sm tracking-wide"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-secondary overflow-hidden">
                {images[selectedImageIndex] && (
                  <img
                    src={images[selectedImageIndex].node.url}
                    alt={images[selectedImageIndex].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-foreground/60 hover:text-foreground transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground/60 hover:text-foreground transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden border-2 transition-colors ${
                        selectedImageIndex === index ? "border-foreground" : "border-transparent"
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

              {/* Image Counter */}
              <p className="font-body text-sm text-muted-foreground">
                {selectedImageIndex + 1} / {images.length}
              </p>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div className="space-y-2">
                <h1 className="font-display text-2xl md:text-3xl font-light tracking-wide text-foreground">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3">
                  {compareAtPrice && (
                    <span className="font-body text-lg text-muted-foreground line-through">
                      ₹{Math.round(compareAtPrice).toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="font-body text-xl md:text-2xl text-foreground font-medium">
                    ₹{Math.round(price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="space-y-4">
                  <p className="font-body text-sm text-muted-foreground">Size</p>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => {
                      const variantForSize = variants.find(v => 
                        v.node.selectedOptions.some(opt => opt.value === size)
                      );
                      const isAvailable = variantForSize?.node.availableForSale ?? false;
                      
                      return (
                        <button
                          key={size}
                          onClick={() => isAvailable && handleSizeSelect(size)}
                          disabled={!isAvailable}
                          className={`px-4 py-2 font-body text-sm transition-all duration-200 ${
                            getSelectedSize() === size
                              ? "bg-foreground text-background"
                              : isAvailable
                                ? "text-foreground hover:bg-foreground/10"
                                : "text-muted-foreground/40 cursor-not-allowed line-through"
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
              <div className="flex items-center gap-6">
                <p className="font-body text-sm text-muted-foreground">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-body text-base min-w-[24px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || isAddingToCart}
                  className="flex-1 py-4 bg-foreground text-background font-body text-xs tracking-[0.15em] uppercase hover:bg-foreground/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="flex-1 py-4 text-foreground font-body text-xs tracking-[0.15em] uppercase hover:bg-foreground/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="flex items-center gap-2 pt-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedVariant.availableForSale ? "bg-green-600" : "bg-red-500"}`} />
                  <span className="font-body text-xs text-muted-foreground tracking-wide">
                    {selectedVariant.availableForSale ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              )}

              {/* Collapsible Sections */}
              <div className="pt-8 space-y-0">
                <Collapsible open={productDetailsOpen} onOpenChange={setProductDetailsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-t border-border/50 font-body text-xs tracking-wide text-foreground hover:text-muted-foreground transition-colors uppercase">
                    <span>Product Details</span>
                    <Plus size={14} className={`transition-transform duration-200 ${productDetailsOpen ? "rotate-45" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-4">
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {product.description || "Premium quality crafted with attention to detail."}
                    </p>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={shippingOpen} onOpenChange={setShippingOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-t border-border/50 font-body text-xs tracking-wide text-foreground hover:text-muted-foreground transition-colors uppercase">
                    <span>Shipping & Returns</span>
                    <Plus size={14} className={`transition-transform duration-200 ${shippingOpen ? "rotate-45" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-4">
                    <div className="font-body text-sm text-muted-foreground leading-relaxed space-y-1">
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
