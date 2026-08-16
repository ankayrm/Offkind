export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductCategory =
  | "hoodies"
  | "tees"
  | "knitwear"
  | "shorts"
  | "pants"
  | "jackets"
  | "accessories"
  | "shoes";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: ProductCategory;
  sizes: Size[];
  description: string;
  images: string[];
  brand?: string;
  condition?: string;
  featured?: boolean;
  tags?: string[];
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  price: number;
  pieceCount: number;
  description: string;
  image: string;
  includes: string[];
  featured?: boolean;
}

export interface MysteryOption {
  id: string;
  slug: string;
  name: string;
  price: number;
  pieceCount: number;
  description: string;
  tagline: string;
}

export type CartItemType = "product" | "bundle" | "mystery";

export interface CartItem {
  id: string;
  type: CartItemType;
  name: string;
  price: number;
  size: Size;
  quantity: number;
  image?: string;
  reference?: string;
  pieceCount?: number;
  productId?: string;
  bundleId?: string;
  mysteryOptionId?: string;
}

export interface MysteryResult {
  reference: string;
  optionId: string;
  optionName: string;
  size: Size;
  pieceCount: number;
  price: number;
}
