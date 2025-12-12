import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

// Detect mobile device
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

const ShopifyCart = () => {
  const { items, removeItem, updateQuantity, clearCart, isLoading, createCheckout, totalItems, totalPrice } =
    useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = totalItems();
  const total = totalPrice();
  const currencyCode = items[0]?.price.currencyCode || "INR";

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const checkoutUrl = await createCheckout();
      if (checkoutUrl) {
        clearCart();
        setIsOpen(false);
        
        // On mobile, redirect in same window to avoid popup blockers
        // On desktop, open in new tab for better UX
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
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 hover:text-muted-foreground transition-colors">
          <ShoppingBag size={22} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center font-body">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl tracking-tight">
            YOUR CART
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag size={48} className="text-muted-foreground mb-4" />
            <p className="font-body text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 space-y-6 min-h-0">
              {items.map((item) => {
                const image = item.product.node.images.edges[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-24 flex-shrink-0 border border-border bg-muted overflow-hidden">
                      {image ? (
                        <img
                          src={image.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[8px] text-muted-foreground">IMG</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-display text-lg truncate">{item.product.node.title}</h4>
                        <p className="font-body text-xs text-muted-foreground">
                          {item.selectedOptions.map(opt => opt.value).join(' • ')}
                        </p>
                        <p className="font-body text-sm">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 font-body text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-border pt-6 space-y-4 bg-background">
              <div className="flex justify-between items-center">
                <span className="font-body text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl">
                  {currencyCode} {total.toFixed(2)}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                Shipping calculated at checkout
              </p>
              <Button
                onClick={handleCheckout}
                disabled={isLoading || items.length === 0}
                className="w-full py-6 font-display text-lg tracking-wider touch-manipulation active:scale-[0.98] transition-transform"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    PROCEED TO CHECKOUT
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShopifyCart;
