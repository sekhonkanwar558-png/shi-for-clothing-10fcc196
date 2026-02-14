import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import onigiriLogo from "@/assets/onigiri-logo.png";

const PaymentSuccess = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5 sm:px-6">
      <div className="text-center space-y-8 max-w-md mx-auto animate-fade-in">
        <img src={onigiriLogo} alt="shi-for" className="h-16 w-auto mx-auto" />
        <div className="w-12 h-px bg-accent mx-auto" />
        <h1 className="font-display text-section font-light italic">Order Confirmed</h1>
        <p className="text-body text-muted-foreground leading-[1.9]">
          Thank you for your purchase. You'll receive an email confirmation shortly.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
};

export default PaymentSuccess;
