export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  priceId: string;
}

export const products: Product[] = [
  {
    id: "prod_TaF0tqEw4T87rS",
    name: "OVERSIZED T SHIRT",
    category: "HOODIE",
    price: 180,
    priceId: "price_1Sd4WLJ16B8cS3WHaNUvki7G",
  },
  {
    id: "prod_TaF0MA9oejXQ1V",
    name: "SHATTER TEE",
    category: "TEE",
    price: 85,
    priceId: "price_1Sd4WaJ16B8cS3WHOK6CMT2j",
  },
  {
    id: "prod_TaF0HJCj4Wo0QV",
    name: "VOID CARGO",
    category: "CARGO",
    price: 220,
    priceId: "price_1Sd4WlJ16B8cS3WHzIJxcC4f",
  },
  {
    id: "prod_TaF0RErdhJlQgB",
    name: "CHAOS JACKET",
    category: "JACKET",
    price: 350,
    priceId: "price_1Sd4WvJ16B8cS3WHO7fbFwCs",
  },
];
