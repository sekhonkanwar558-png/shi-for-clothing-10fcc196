import { ShoppingBag, Minus, Plus, ArrowRight, Loader2 } from "lucide-react";
import { ShopifyProduct, createStorefrontCheckout } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

// Detect mobile device
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

const ShopifyProductCard = ({ product, index = 0 }: ShopifyProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const variants = product.node.variants.edges;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const selectedVariant = variants[selectedVariantIndex]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = parseFloat(selectedVariant?.price.amount || "0");

  // Get size options if available
  const sizeOption = product.node.options.find(opt => opt.name.toLowerCase() === "size");
  const sizes = sizeOption?.values || [];

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select an option");
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate slight delay for feedback
    setTimeout(() => {
      addItem({
        product,
        variantId: selectedVariant.id,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        quantity: quantity,
        selectedOptions: selectedVariant.selectedOptions,
      });
      
      toast.success(`${quantity} × ${product.node.title} added to cart`, {
        position: "top-center",
      });
      
      setIsAddingToCart(false);
    }, 200);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      toast.error("Please select an option");
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

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div
      className="opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden mb-6 sm:mb-8 bg-secondary img-hover-zoom">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.node.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 border border-dashed border-muted-foreground/40 mb-4" />
            <span className="font-body text-xs tracking-[0.15em] text-muted-foreground">
              PRODUCT IMAGE
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-5 sm:space-y-6">
        <div className="text-center">
          <h3 className="font-body text-base sm:text-lg tracking-[0.05em] font-light text-foreground mb-1.5 sm:mb-2">
            {product.node.title}
          </h3>
          <p className="font-body text-lg sm:text-xl text-foreground font-medium">
            ₹{price.toFixed(0)}
          </p>
        </div>

        {/* Size Selection */}
        {sizes.length > 0 && (
          <div className="space-y-2.5 sm:space-y-3">
            <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground text-center uppercase">
              Size
            </p>
            <div className="flex justify-center gap-3 sm:gap-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`w-10 h-10 sm:w-11 sm:h-11 font-body text-xs sm:text-sm transition-all duration-200 touch-manipulation active:scale-95 ${
                    getSelectedSize() === size
                      ? "text-foreground font-medium underline underline-offset-4"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="space-y-2.5 sm:space-y-3">
          <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground text-center uppercase">
            Quantity
          </p>
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              <button
                onClick={decrementQuantity}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation active:scale-95"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="font-body text-base min-w-[40px] text-center text-foreground">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors touch-manipulation active:scale-95"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 pt-4">
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || isAddingToCart}
            className="font-body text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase text-foreground hover:text-muted-foreground transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-[0.98] py-2"
          >
            {isAddingToCart ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
            )}
            Add to Cart
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={!selectedVariant?.availableForSale || isBuyingNow}
            className="font-body text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-[0.98] py-2"
          >
            {isBuyingNow ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                Buy Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopifyProductCard;