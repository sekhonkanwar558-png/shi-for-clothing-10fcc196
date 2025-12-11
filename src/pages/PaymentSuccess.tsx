import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-6 animate-fade-in">
        <CheckCircle size={64} className="mx-auto text-green-600" />
        <h1 className="heading-display text-4xl md:text-5xl">ORDER CONFIRMED</h1>
        <p className="font-body text-muted-foreground max-w-md mx-auto">
          Thank you for your purchase. You'll receive an email confirmation shortly.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-display text-lg tracking-wider hover:bg-primary/90 transition-all"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    </main>
  );
};

export default PaymentSuccess;
