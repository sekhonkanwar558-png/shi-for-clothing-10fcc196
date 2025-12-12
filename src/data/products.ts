import oversizedTshirtImg from "@/assets/oversized-tshirt.png";

export type Size = "S" | "M" | "L";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  priceId: string;
  image?: string;
  sizes?: Size[];
}

export const products: Product[] = [
  {
    id: "prod_TaFNGil14tdZVt",
    name: "OVERSIZED T SHIRT",
    category: "TEE",
    price: 0.5,
    originalPrice: 1,
    priceId: "price_1Sd4t4J16B8cS3WHSDKI7U4L",
    image: oversizedTshirtImg,
    sizes: ["S", "M", "L"],
  },
  {
    id: "prod_TaF0MA9oejXQ1V",
    name: "SHATTER TEE",
    category: "TEE",
    price: 85,
    priceId: "price_1Sd4WaJ16B8cS3WHOK6CMT2j",
    image: oversizedTshirtImg,
    sizes: ["S", "M", "L"],
  },
  {
    id: "prod_TaF0HJCj4Wo0QV",
    name: "VOID CARGO",
    category: "CARGO",
    price: 220,
    priceId: "price_1Sd4WlJ16B8cS3WHzIJxcC4f",
    image: oversizedTshirtImg,
    sizes: ["S", "M", "L"],
  },
  {
    id: "prod_TaF0RErdhJlQgB",
    name: "CHAOS JACKET",
    category: "JACKET",
    price: 350,
    priceId: "price_1Sd4WvJ16B8cS3WHO7fbFwCs",
    image: oversizedTshirtImg,
    sizes: ["S", "M", "L"],
  },
];
