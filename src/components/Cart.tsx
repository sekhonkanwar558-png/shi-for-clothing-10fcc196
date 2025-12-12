import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);
    try {
      const lineItems = items.map((item) => ({
        priceId: item.priceId,
        quantity: item.quantity,
      }));

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { lineItems },
      });

      if (error) throw error;

      if (data?.url) {
        clearCart();
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 hover:text-muted-foreground transition-colors">
          <ShoppingBag size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center font-body">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
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
            <div className="flex-1 overflow-auto py-6 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size || "default"}`} className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-24 flex-shrink-0 border border-border bg-muted overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[8px] text-muted-foreground">IMG</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-body text-xs text-muted-foreground">
                        {item.category}
                      </p>
                      <h4 className="font-display text-lg">{item.name}</h4>
                      {item.size && (
                        <p className="font-body text-xs text-muted-foreground">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="font-body text-sm">${item.price}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.size)
                          }
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-4 font-body text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.size)
                          }
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl">${totalPrice}</span>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                Shipping calculated at checkout
              </p>
              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full py-6 font-display text-lg tracking-wider"
              >
                {isLoading ? "PROCESSING..." : "CHECKOUT"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
