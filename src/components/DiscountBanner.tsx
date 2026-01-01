import { useEffect, useState } from "react";
import { storefrontApiRequest } from "@/lib/shopify";

interface DiscountCode {
  code: string;
  percentage: number;
  endsAt: string | null;
}

// Query to get automatic discounts from Shopify
const AUTOMATIC_DISCOUNTS_QUERY = `
  query GetAutomaticDiscounts {
    automaticDiscountNodes(first: 5) {
      edges {
        node {
          id
          automaticDiscount {
            ... on DiscountAutomaticBasic {
              title
              endsAt
              customerGets {
                value {
                  ... on DiscountPercentage {
                    percentage
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const DiscountBanner = () => {
  const [discountCode] = useState<DiscountCode>({
    code: "SHINEW",
    percentage: 20,
    endsAt: "2025-12-31T23:59:59"
  });

  if (!discountCode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-foreground text-background overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-2.5">
        <span className="inline-block mx-8 text-label">
          Use code <span className="font-semibold">{discountCode.code}</span> for {discountCode.percentage}% off
        </span>
        <span className="inline-block mx-8 text-label">•</span>
        <span className="inline-block mx-8 text-label">Free shipping on orders over ₹999</span>
        <span className="inline-block mx-8 text-label">•</span>
        <span className="inline-block mx-8 text-label">
          Use code <span className="font-semibold">{discountCode.code}</span> for {discountCode.percentage}% off
        </span>
        <span className="inline-block mx-8 text-label">•</span>
        <span className="inline-block mx-8 text-label">Free shipping on orders over ₹999</span>
        <span className="inline-block mx-8 text-label">•</span>
        <span className="inline-block mx-8 text-label">
          Use code <span className="font-semibold">{discountCode.code}</span> for {discountCode.percentage}% off
        </span>
        <span className="inline-block mx-8 text-label">•</span>
        <span className="inline-block mx-8 text-label">Free shipping on orders over ₹999</span>
      </div>
    </div>
  );
};

export default DiscountBanner;
