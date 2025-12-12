import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product, Size } from "@/data/products";
import { toast } from "sonner";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(
    product.sizes?.[0]
  );

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      priceId: product.priceId,
      size: selectedSize,
      image: product.image,
    });
    toast.success(`${product.name}${selectedSize ? ` (${selectedSize})` : ""} added to cart`);
  };

  return (
    <div
      className="group animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] relative overflow-hidden mb-4 border border-border group-hover:border-foreground/50 transition-colors bg-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 border border-dashed border-muted-foreground/40 mb-4" />
            <span className="font-body text-xs tracking-[0.15em] leading-relaxed">
              PRODUCT IMAGE HERE
              <br />
              <span className="text-muted-foreground">({product.category})</span>
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag size={16} />
          ADD TO CART
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <p className="font-body text-xs tracking-[0.2em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-display text-xl">{product.name}</h3>
        <p className="font-body text-lg text-foreground">${product.price}</p>

        {/* Size Selection */}
        {product.sizes && (
          <div className="flex gap-2 pt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 border font-body text-sm transition-colors ${
                  selectedSize === size
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
  );
};

export default ProductCard;
