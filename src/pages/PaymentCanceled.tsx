import { Link } from "react-router-dom";
import onigiriLogo from "@/assets/onigiri-logo.png";

const PaymentCanceled = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5 sm:px-6">
      <div className="text-center space-y-8 max-w-md mx-auto animate-fade-in">
        <img src={onigiriLogo} alt="shi-for" className="h-16 w-auto mx-auto" />
        <div className="w-12 h-px bg-accent mx-auto" />
        <h1 className="font-display text-section font-light italic">Order Canceled</h1>
        <p className="text-body text-muted-foreground leading-[1.9]">
          Your order was canceled. Your cart items are still available.
        </p>
        <Link
          to="/shop"
          className="btn-secondary inline-flex"
        >
          Return to Shop
        </Link>
      </div>
    </main>
  );
};

export default PaymentCanceled;
