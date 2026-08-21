export type Size = "XS" | "S" | "M" | "L" | "XL" | "2XL";

export type Gender = "men" | "women";

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
  gender: Gender;
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
  gender: Gender;
  pieceCount: number;
  description: string;
  image: string;
  /** On-model look for this combo. Shown on hover / detail. */
  lookImage?: string;
  includes: string[];
  featured?: boolean;
}

export interface MysteryOption {
  id: string;
  slug: string;
  name: string;
  price: number;
  gender: Gender;
  pieceCount: number;
  description: string;
  tagline: string;
  image: string;
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
  gender?: Gender;
}

export interface MysteryResult {
  reference: string;
  optionId: string;
  optionName: string;
  size: Size;
  pieceCount: number;
  price: number;
}

export type DeliveryMethod = "cash-on-delivery" | "box-now" | "regular-delivery";

export interface CheckoutDetails {
  email: string;
  phone: string;
  phoneCountry: string;
  city: string;
  details: string;
  deliveryMethod: DeliveryMethod | null;
}
