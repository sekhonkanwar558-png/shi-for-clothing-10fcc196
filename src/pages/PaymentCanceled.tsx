import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCanceled = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-6 animate-fade-in">
        <XCircle size={64} className="mx-auto text-muted-foreground" />
        <h1 className="heading-display text-4xl md:text-5xl">ORDER CANCELED</h1>
        <p className="font-body text-muted-foreground max-w-md mx-auto">
          Your order was canceled. Your cart items are still available.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-display text-lg tracking-wider hover:bg-primary/90 transition-all"
        >
          RETURN TO SHOP
        </Link>
      </div>
    </main>
  );
};

export default PaymentCanceled;
