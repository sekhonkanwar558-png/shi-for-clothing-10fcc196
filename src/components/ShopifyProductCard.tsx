import { ShoppingBag, ZoomIn } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import ImageZoomModal from "./ImageZoomModal";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

const ShopifyProductCard = ({ product, index = 0 }: ShopifyProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const variants = product.node.variants.edges;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const selectedVariant = variants[selectedVariantIndex]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = parseFloat(selectedVariant?.price.amount || "0");
  const compareAtPrice = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice.amount) : null;
  const currencyCode = selectedVariant?.price.currencyCode || "INR";

  // Get size options if available
  const sizeOption = product.node.options.find(opt => opt.name.toLowerCase() === "size");
  const sizes = sizeOption?.values || [];

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select an option");
      return;
    }

    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions,
    });
    
    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
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

  return (
    <>
      <div
        className="group animate-slide-up"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Product Image */}
        <div className="aspect-[3/4] relative overflow-hidden mb-4 border border-border group-hover:border-foreground/50 transition-colors bg-muted">
          {image ? (
            <>
              <img
                src={image.url}
                alt={image.altText || product.node.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsZoomOpen(true)}
              />
              <button
                onClick={() => setIsZoomOpen(true)}
                className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
              >
                <ZoomIn size={18} />
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 border border-dashed border-muted-foreground/40 mb-4" />
              <span className="font-body text-xs tracking-[0.15em] leading-relaxed">
                PRODUCT IMAGE
              </span>
            </div>
          )}

          {/* Sale Badge */}
          {compareAtPrice && compareAtPrice > price && (
            <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-body tracking-wider">
              SALE
            </div>
          )}

          {/* Add to Cart Button - Always visible on mobile */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale}
            className="absolute bottom-4 left-4 right-4 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation active:scale-[0.98]"
          >
            <ShoppingBag size={16} />
            {selectedVariant?.availableForSale ? "ADD TO CART" : "SOLD OUT"}
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="font-body text-sm tracking-[0.1em] font-light text-foreground">{product.node.title}</h3>
          <div className="flex items-center gap-2">
            <p className="font-body text-sm text-muted-foreground font-light">
              {currencyCode} {price.toFixed(2)}
            </p>
            {compareAtPrice && compareAtPrice > price && (
              <p className="font-body text-xs text-muted-foreground/60 line-through">
                {currencyCode} {compareAtPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Size Selection */}
          {sizes.length > 0 && (
            <div className="flex gap-2 pt-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`w-10 h-10 border font-body text-sm transition-colors ${
                    getSelectedSize() === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {image && (
        <ImageZoomModal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          image={image.url}
          alt={image.altText || product.node.title}
        />
      )}
    </>
  );
};

export default ShopifyProductCard;
