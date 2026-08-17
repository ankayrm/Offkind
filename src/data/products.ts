import type { Gender, Product } from "@/types";

/**
 * Live catalog — replace sizes/condition as needed.
 * Individual piece prices are not shown on the site (DM / WhatsApp).
 * price field kept at 0 for cart compatibility.
 */
const menCatalog: Omit<Product, "gender">[] = [
  {
    id: "p-01",
    slug: "polo-cable-zip-cream",
    name: "Polo Cable Zip",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Cream cable-knit full-zip with mock neck, silver zip, and navy pony. Heavy knit. Clean flex.",
    images: [
      "/products/polo-white-zip.png",
      "/products/polo-white-zip-hover.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "zip", "cream", "knitwear"],
  },
  {
    id: "p-02",
    slug: "essentials-tee-black",
    name: "Essentials Tee — Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Boxy black Fear of God Essentials tee. Small chest print. Oversized street staple.",
    images: [
      "/products/essentials-tee-black.png",
      "/products/essentials-tee-black-hover.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "tee", "black", "fog"],
  },
  {
    id: "p-03",
    slug: "polo-cable-quarterzip-black",
    name: "Polo Cable Quarter-Zip",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black cable-knit quarter-zip with funnel neck and red pony. Layer or solo.",
    images: [
      "/products/polo-black-quarterzip.png",
      "/products/polo-black-quarterzip-hover.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "black"],
  },
  {
    id: "p-04",
    slug: "essentials-hoodie-grey",
    name: "Essentials Hoodie — Grey",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Heather grey Fear of God Essentials pullover. Chest logo front, bold back print. Oversized fleece.",
    images: [
      "/products/essentials-hoodie-grey-front.png",
      "/products/essentials-hoodie-grey-back.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "hoodie", "grey", "fog"],
  },
  {
    id: "p-05",
    slug: "polo-cable-crew-white",
    name: "Polo Cable Crew — White",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White cable-knit crewneck with navy pony. Classic knit, street-ready.",
    images: [
      "/products/polo-white-crew.png",
      "/products/polo-white-crew-hover.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "crew", "white"],
  },
  {
    id: "p-06",
    slug: "essentials-tee-taupe",
    name: "Essentials Tee — Taupe",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Heather taupe Essentials boxy tee. Small black chest print. Soft earth tone.",
    images: [
      "/products/essentials-tee-taupe.png",
      "/products/essentials-tee-taupe-hover.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "tee", "taupe", "fog"],
  },
  {
    id: "p-07",
    slug: "essentials-shorts-black",
    name: "Essentials Shorts — Black",
    price: 0,
    category: "shorts",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Essentials fleece shorts. Long drawstrings, side pockets, leg print.",
    images: [
      "/products/essentials-shorts-black.png",
      "/products/essentials-shorts-black-hover.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "shorts", "black", "fog"],
  },
  {
    id: "p-08",
    slug: "polo-cable-crew-navy",
    name: "Polo Cable Crew — Navy",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Navy cable-knit crewneck with red pony. Heavy texture. Everyday premium.",
    images: [
      "/products/polo-navy-crew.png",
      "/products/polo-navy-crew-hover.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "crew", "navy"],
  },
  {
    id: "p-09",
    slug: "essentials-shorts-grey",
    name: "Essentials Shorts — Grey",
    price: 0,
    category: "shorts",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Heather grey Essentials fleece shorts. Long drawstrings, rubber waist tag, leg print.",
    images: [
      "/products/essentials-shorts-grey.png",
      "/products/essentials-shorts-grey-hover.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "shorts", "grey", "fog"],
  },
];

function toWomenImages(images: string[]): string[] {
  const productShot = images[0];
  const onModel = productShot.replace(/\.png$/, "-w.png");
  return [productShot, onModel];
}

export const products: Product[] = [
  ...menCatalog.map((p) => ({ ...p, gender: "men" as const })),
  ...menCatalog.map((p) => ({
    ...p,
    id: `${p.id}-w`,
    gender: "women" as const,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"] as Product["sizes"],
    images: toWomenImages(p.images),
  })),
];

export function getProductsByGender(gender: Gender): Product[] {
  return products.filter((p) => p.gender === gender);
}

export function getProductBySlug(
  slug: string,
  gender?: Gender
): Product | undefined {
  if (gender) {
    return products.find((p) => p.slug === slug && p.gender === gender);
  }
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(gender?: Gender): Product[] {
  const list = gender ? getProductsByGender(gender) : products;
  return list.filter((p) => p.featured);
}

export function getProductsByCategory(
  category: string,
  gender?: Gender
): Product[] {
  const list = gender ? getProductsByGender(gender) : products;
  if (!category || category === "all") return list;
  return list.filter((p) => p.category === category);
}

export function searchProducts(query: string, gender?: Gender): Product[] {
  const list = gender ? getProductsByGender(gender) : products;
  const q = query.toLowerCase().trim();
  if (!q) return list;
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.includes(q)) ||
      p.description.toLowerCase().includes(q)
  );
}
