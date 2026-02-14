import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

const ShopifyCart = () => {
  const { items, removeItem, updateQuantity, clearCart, isLoading, createCheckout, totalItems, totalPrice } =
    useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = totalItems();
  const total = totalPrice();

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
        <button 
          className="relative p-2 hover:opacity-60 transition-opacity duration-500 touch-manipulation active:scale-[0.94]"
          aria-label={`Shopping cart with ${itemCount} items`}
        >
          <ShoppingBag size={20} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 bg-foreground text-background text-[9px] sm:text-[10px] flex items-center justify-center font-body animate-scale-in rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full safe-bottom border-l-0 sm:border-l">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-xl sm:text-2xl font-light tracking-[0.05em]">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-6">
            <ShoppingBag size={32} strokeWidth={1} className="text-muted-foreground" />
            <p className="text-body text-muted-foreground">Your cart is empty</p>
            <button 
              onClick={() => setIsOpen(false)}
              className="btn-secondary text-xs"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 sm:py-6 space-y-5 sm:space-y-6 min-h-0 touch-action-pan">
              {items.map((item) => {
                const image = item.product.node.images.edges[0]?.node;
                return (
                  <div key={item.variantId} className="flex gap-3 sm:gap-4 animate-fade-in">
                    <div className="w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 bg-muted overflow-hidden">
                      {image ? (
                        <img
                          src={image.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[8px] text-muted-foreground">IMG</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-display text-sm sm:text-base font-light truncate">{item.product.node.title}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground tracking-wider mt-0.5">
                          {item.selectedOptions.map(opt => opt.value).join(' · ')}
                        </p>
                        <p className="text-xs sm:text-sm mt-1 font-light">
                          ₹{Math.round(parseFloat(item.price.amount)).toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-500 touch-manipulation active:scale-[0.9]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} strokeWidth={1.5} />
                          </button>
                          <span className="text-xs min-w-[20px] text-center font-light">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-500 touch-manipulation active:scale-[0.9]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-500 touch-manipulation"
                          aria-label="Remove item"
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-border pt-4 sm:pt-6 space-y-4 bg-background">
              <div className="flex justify-between items-center">
                <span className="text-label tracking-[0.2em] text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl sm:text-2xl font-light">
                  ₹{Math.round(total).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground tracking-wider">
                Shipping calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                disabled={isLoading || items.length === 0}
                className="w-full btn-primary py-4 sm:py-5 disabled:opacity-40 active:scale-[0.98] transition-transform touch-manipulation"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Checkout
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShopifyCart;
