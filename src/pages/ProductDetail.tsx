import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
        <DiscountBanner />
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh] pt-16">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <DiscountBanner />
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-[60vh] pt-16 gap-6">
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
      <DiscountBanner />
      <Navbar />
      
      <section className="pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back Link */}
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 md:mb-12 text-micro font-medium"
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                {images[selectedImageIndex] && (
                  <img
                    src={images[selectedImageIndex].node.url}
                    alt={images[selectedImageIndex].node.altText || product.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                    }`}
                  />
                )}
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-foreground/40 hover:text-foreground transition-colors duration-300"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={28} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-foreground/40 hover:text-foreground transition-colors duration-300"
                      aria-label="Next image"
                    >
                      <ChevronRight size={28} strokeWidth={1.5} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden transition-opacity duration-300 ${
                        selectedImageIndex === index ? "opacity-100" : "opacity-30 hover:opacity-60"
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
              <p className="text-micro text-muted-foreground">
                {selectedImageIndex + 1} / {images.length}
              </p>
            </div>

            {/* Right: Product Info */}
            <div className="space-y-8">
              {/* Title & Price */}
              <div className="space-y-4">
                <h1 className="font-display text-section text-foreground">
                  {product.title}
                </h1>
                <div className="flex items-baseline gap-3">
                  {compareAtPrice && (
                    <span className="text-body text-muted-foreground line-through">
                      ₹{Math.round(compareAtPrice).toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-2xl md:text-3xl font-display text-foreground">
                    ₹{Math.round(price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="space-y-4">
                  <p className="text-label text-muted-foreground">Size</p>
                  <div className="flex flex-wrap gap-3">
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
                          className={`px-5 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                            isSelected
                              ? "bg-foreground text-background shadow-button"
                              : isAvailable
                                ? "bg-muted text-foreground hover:bg-muted/70"
                                : "bg-muted/50 text-muted-foreground/40 cursor-not-allowed line-through"
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
              <div className="flex items-center gap-8">
                <p className="text-label text-muted-foreground">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2.5 rounded-lg bg-muted text-foreground hover:bg-muted/70 transition-colors duration-300"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-body font-medium min-w-[32px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2.5 rounded-lg bg-muted text-foreground hover:bg-muted/70 transition-colors duration-300"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || isAddingToCart}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isAddingToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Adding...
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant || isBuyingNow}
                  className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBuyingNow ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
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
                  <span className={`w-2 h-2 rounded-full ${selectedVariant.availableForSale ? "bg-green-500" : "bg-red-400"}`} />
                  <span className="text-micro text-muted-foreground">
                    {selectedVariant.availableForSale ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              )}

              {/* Collapsible Sections */}
              <div className="pt-6 space-y-0 border-t border-border/50">
                <Collapsible open={productDetailsOpen} onOpenChange={setProductDetailsOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-5 text-label text-foreground hover:text-muted-foreground transition-colors duration-300">
                    <span>Product Details</span>
                    <Plus size={14} className={`transition-transform duration-300 ${productDetailsOpen ? "rotate-45" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-5">
                    <p className="text-body-sm text-muted-foreground leading-relaxed">
                      {product.description || "Premium quality crafted with attention to detail."}
                    </p>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible open={shippingOpen} onOpenChange={setShippingOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-5 border-t border-border/50 text-label text-foreground hover:text-muted-foreground transition-colors duration-300">
                    <span>Shipping & Returns</span>
                    <Plus size={14} className={`transition-transform duration-300 ${shippingOpen ? "rotate-45" : ""}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pb-5">
                    <div className="text-body-sm text-muted-foreground leading-relaxed space-y-2">
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