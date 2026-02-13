import { useEffect, useState } from "react";
import { storefrontApiRequest } from "@/lib/shopify";

interface DiscountCode {
  code: string;
  percentage: number;
  endsAt: string | null;
}

const DiscountBanner = () => {
  const [discountCode] = useState<DiscountCode>({
    code: "SHINEW",
    percentage: 20,
    endsAt: "2025-12-31T23:59:59"
  });

  if (!discountCode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-2">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-block">
            <span className="inline-block mx-8 text-[10px] tracking-[0.15em] uppercase font-medium">
              Use code <span className="font-semibold">{discountCode.code}</span> for {discountCode.percentage}% off
            </span>
            <span className="inline-block mx-8 text-[10px] tracking-[0.15em] uppercase">·</span>
            <span className="inline-block mx-8 text-[10px] tracking-[0.15em] uppercase font-medium">Free shipping on orders over ₹999</span>
            <span className="inline-block mx-8 text-[10px] tracking-[0.15em] uppercase">·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DiscountBanner;
