import type { Gender, Product } from "@/types";
import { maleOnModelExtras } from "@/lib/utils";

/**
 * Live catalog. Replace sizes/condition as needed.
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
    name: "Essentials Tee Black",
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
    name: "Polo Cable Quarter-Zip Black",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black cable-knit quarter-zip with funnel neck and red pony. Layer or solo.",
    images: [
      "/products/polo-black-quarterzip.png",
      "/products/polo-black-quarterzip-hover.png",
      "/products/polo-black-quarterzip-neck.png",
      "/products/polo-black-quarterzip-tag.png",
      "/products/polo-black-quarterzip-logo.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "black"],
  },
  {
    id: "p-04",
    slug: "essentials-hoodie-grey",
    name: "Essentials Hoodie Grey",
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
    name: "Polo Cable Crew White",
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
    name: "Essentials Tee Taupe",
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
    name: "Essentials Shorts Black",
    price: 0,
    category: "shorts",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Essentials fleece shorts. Long drawstrings, side pockets, leg print.",
    images: [
      "/products/essentials-shorts-black.png",
      "/products/essentials-shorts-black-hover.png",
      "/products/essentials-shorts-black-tag.png",
      "/products/essentials-shorts-black-label.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "shorts", "black", "fog"],
  },
  {
    id: "p-08",
    slug: "polo-cable-crew-navy",
    name: "Polo Cable Crew Navy",
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
    name: "Essentials Shorts Grey",
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
  {
    id: "p-10",
    slug: "chrome-hearts-horseshoe-tee-white",
    name: "Chrome Hearts Horseshoe Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Chrome Hearts crew with black horseshoe and scroll on the chest, large chain-link horseshoe on the back.",
    images: [
      "/products/chrome-hearts-horseshoe-tee-white.png",
      "/products/chrome-hearts-horseshoe-tee-white-hover.png",
      "/products/chrome-hearts-horseshoe-tee-white-neck.png",
      "/products/chrome-hearts-horseshoe-tee-white-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    featured: true,
    tags: ["chrome hearts", "tee", "white", "horseshoe"],
  },
  {
    id: "p-11",
    slug: "chrome-hearts-horseshoe-tee-black",
    name: "Chrome Hearts Horseshoe Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Chrome Hearts crew with white horseshoe chest print and a full back horseshoe plus scroll.",
    images: [
      "/products/chrome-hearts-horseshoe-tee-black.png",
      "/products/chrome-hearts-horseshoe-tee-black-hover.png",
      "/products/chrome-hearts-horseshoe-tee-black-neck.png",
      "/products/chrome-hearts-horseshoe-tee-black-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    featured: true,
    tags: ["chrome hearts", "tee", "black", "horseshoe"],
  },
  {
    id: "p-12",
    slug: "chrome-hearts-scribble-tee-white",
    name: "Chrome Hearts Scribble Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Chrome Hearts tee. Pink-to-purple gradient horseshoe with sketch scribbles, small chest print, large back graphic.",
    images: [
      "/products/chrome-hearts-scribble-tee-white.png",
      "/products/chrome-hearts-scribble-tee-white-hover.png",
      "/products/chrome-hearts-scribble-tee-white-neck.png",
      "/products/chrome-hearts-scribble-tee-white-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    featured: true,
    tags: ["chrome hearts", "tee", "white", "scribble", "pink"],
  },
  {
    id: "p-13",
    slug: "chrome-hearts-scribble-tee-black",
    name: "Chrome Hearts Scribble Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Chrome Hearts tee. Lime-green sketch horseshoe on the chest, large green graffiti horseshoe on the back.",
    images: [
      "/products/chrome-hearts-scribble-tee-black.png",
      "/products/chrome-hearts-scribble-tee-black-hover.png",
      "/products/chrome-hearts-scribble-tee-black-neck.png",
      "/products/chrome-hearts-scribble-tee-black-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    featured: true,
    tags: ["chrome hearts", "tee", "black", "scribble", "green"],
  },
  {
    id: "p-14",
    slug: "chrome-hearts-crosses-tee-white",
    name: "Chrome Hearts Crosses Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Chrome Hearts tee. Small horseshoe on the chest, five stacked colored crosses down the back.",
    images: [
      "/products/chrome-hearts-crosses-tee-white.png",
      "/products/chrome-hearts-crosses-tee-white-hover.png",
      "/products/chrome-hearts-crosses-tee-white-neck.png",
      "/products/chrome-hearts-crosses-tee-white-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "white", "crosses"],
  },
  {
    id: "p-15",
    slug: "chrome-hearts-crosses-tee-black",
    name: "Chrome Hearts Crosses Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Chrome Hearts tee. Small horseshoe on the chest, five stacked colored crosses down the back.",
    images: [
      "/products/chrome-hearts-crosses-tee-black.png",
      "/products/chrome-hearts-crosses-tee-black-hover.png",
      "/products/chrome-hearts-crosses-tee-black-neck.png",
      "/products/chrome-hearts-crosses-tee-black-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "black", "crosses"],
  },
  {
    id: "p-16",
    slug: "chrome-hearts-rainbow-tee-white",
    name: "Chrome Hearts Rainbow Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Chrome Hearts tee. Rainbow gradient horseshoe on the chest with matching rainbow back print.",
    images: [
      "/products/chrome-hearts-rainbow-tee-white.png",
      "/products/chrome-hearts-rainbow-tee-white-hover.png",
      "/products/chrome-hearts-rainbow-tee-white-neck.png",
      "/products/chrome-hearts-rainbow-tee-white-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    featured: true,
    tags: ["chrome hearts", "tee", "white", "rainbow"],
  },
  {
    id: "p-17",
    slug: "chrome-hearts-rainbow-tee-black",
    name: "Chrome Hearts Rainbow Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Chrome Hearts tee. Rainbow gradient horseshoe on the chest with matching rainbow back print.",
    images: [
      "/products/chrome-hearts-rainbow-tee-black.png",
      "/products/chrome-hearts-rainbow-tee-black-hover.png",
      "/products/chrome-hearts-rainbow-tee-black-neck.png",
      "/products/chrome-hearts-rainbow-tee-black-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "black", "rainbow"],
  },
  {
    id: "p-18",
    slug: "chrome-hearts-drip-tee-white",
    name: "Chrome Hearts Drip Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Chrome Hearts tee. Small scroll and cross on the chest, dripping horseshoe graphic on the back.",
    images: [
      "/products/chrome-hearts-drip-tee-white.png",
      "/products/chrome-hearts-drip-tee-white-hover.png",
      "/products/chrome-hearts-drip-tee-white-neck.png",
      "/products/chrome-hearts-drip-tee-white-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "white", "drip"],
  },
  {
    id: "p-19",
    slug: "chrome-hearts-drip-tee-black",
    name: "Chrome Hearts Drip Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Chrome Hearts tee. Small chest graphic, silver dripping horseshoe and script on the back.",
    images: [
      "/products/chrome-hearts-drip-tee-black.png",
      "/products/chrome-hearts-drip-tee-black-hover.png",
      "/products/chrome-hearts-drip-tee-black-neck.png",
      "/products/chrome-hearts-drip-tee-black-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "black", "drip"],
  },
  {
    id: "p-20",
    slug: "chrome-hearts-floral-tee-white",
    name: "Chrome Hearts Floral Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Chrome Hearts tee. Lime horseshoe on the chest, pink and green floral horseshoe on the back.",
    images: [
      "/products/chrome-hearts-floral-tee-white.png",
      "/products/chrome-hearts-floral-tee-white-hover.png",
      "/products/chrome-hearts-floral-tee-white-neck.png",
      "/products/chrome-hearts-floral-tee-white-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    featured: true,
    tags: ["chrome hearts", "tee", "white", "floral", "pink", "green"],
  },
  {
    id: "p-21",
    slug: "chrome-hearts-floral-tee-black",
    name: "Chrome Hearts Floral Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Chrome Hearts tee. Neon horseshoe on the chest, pink and green floral horseshoe on the back.",
    images: [
      "/products/chrome-hearts-floral-tee-black.png",
      "/products/chrome-hearts-floral-tee-black-hover.png",
      "/products/chrome-hearts-floral-tee-black-neck.png",
      "/products/chrome-hearts-floral-tee-black-label.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "black", "floral", "pink", "green"],
  },
  {
    id: "p-22",
    slug: "chrome-hearts-triple-cross-tee-white",
    name: "Chrome Hearts Triple Cross Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Chrome Hearts tee. Ornate gothic cross on the chest, triple-cross Los Angeles graphic on the back.",
    images: [
      "/products/chrome-hearts-triple-cross-tee-white.png",
      "/products/chrome-hearts-triple-cross-tee-white-hover.png",
      "/products/chrome-hearts-triple-cross-tee-white-neck.png",
      "/products/chrome-hearts-triple-cross-tee-white-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "white", "cross", "los angeles"],
  },
  {
    id: "p-23",
    slug: "chrome-hearts-triple-cross-tee-black",
    name: "Chrome Hearts Triple Cross Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Chrome Hearts tee. Ornate gothic cross on the chest, triple-cross graphic on the back.",
    images: [
      "/products/chrome-hearts-triple-cross-tee-black.png",
      "/products/chrome-hearts-triple-cross-tee-black-hover.png",
      "/products/chrome-hearts-triple-cross-tee-black-neck.png",
      "/products/chrome-hearts-triple-cross-tee-black-tag.png",
    ],
    brand: "Chrome Hearts",
    condition: "Like New",
    tags: ["chrome hearts", "tee", "black", "cross", "los angeles"],
  },
  {
    id: "p-24",
    slug: "fog-213-hoodie-cream",
    name: "Fear of God 213 Hoodie Cream",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Cream Fear of God pullover. FEAR OF GOD LOS ANGELES CHAPTER on the chest, distressed 213 on the back.",
    images: [
      "/products/fog-213-hoodie-cream.png",
      "/products/fog-213-hoodie-cream-hover.png",
      "/products/fog-213-hoodie-cream-hood.png",
      "/products/fog-213-hoodie-cream-tag.png",
    ],
    brand: "Fear of God",
    condition: "Like New",
    featured: true,
    tags: ["fear of god", "hoodie", "cream", "213", "los angeles"],
  },
  {
    id: "p-25",
    slug: "essentials-crew-charcoal",
    name: "Essentials Crew Charcoal",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Charcoal Essentials long-sleeve crew. Tonal 3D ESSENTIALS FEAR OF GOD chest print. Heavy fleece.",
    images: [
      "/products/essentials-crew-charcoal.png",
      "/products/essentials-crew-charcoal-back.png",
      "/products/essentials-crew-charcoal-patch.png",
      "/products/essentials-crew-charcoal-tag.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "crew", "charcoal", "fog"],
  },
  {
    id: "p-26",
    slug: "essentials-hoodie-cream",
    name: "Essentials Hoodie Cream",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Cream Essentials pullover. Three black chest bars, ESSENTIALS FEAR OF GOD on the back. Oversized fleece.",
    images: [
      "/products/essentials-hoodie-cream.png",
      "/products/essentials-hoodie-cream-hover.png",
      "/products/essentials-hoodie-cream-hood.png",
      "/products/essentials-hoodie-cream-label.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "hoodie", "cream", "fog"],
  },
  {
    id: "p-27",
    slug: "essentials-sweatpants-brown",
    name: "Essentials Sweatpants Brown",
    price: 0,
    category: "pants",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Dark brown Essentials fleece sweats. Elastic waist, long drawstrings, rubber waist tag, cuffed joggers.",
    images: [
      "/products/essentials-sweatpants-brown.png",
      "/products/essentials-sweatpants-brown-hover.png",
      "/products/essentials-sweatpants-brown-patch.png",
      "/products/essentials-sweatpants-brown-tag.png",
      "/products/essentials-sweatpants-brown-detail.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "sweatpants", "brown", "fog", "pants"],
  },
  {
    id: "p-28",
    slug: "fog-new-york-tee-black",
    name: "Fear of God New York Tee",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Fear of God tee. Distressed FEAR OF GOD New York chest print. Boxy heavyweight cut.",
    images: [
      "/products/fog-new-york-tee-black.png",
      "/products/fog-new-york-tee-black-hover.png",
      "/products/fog-new-york-tee-black-neck.png",
      "/products/fog-new-york-tee-black-tag.png",
    ],
    brand: "Fear of God",
    condition: "Like New",
    featured: true,
    tags: ["fear of god", "tee", "black", "new york"],
  },
  {
    id: "p-29",
    slug: "essentials-77-tee-black",
    name: "Essentials 77 Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Essentials boxy tee. Cream ESSENTIALS 77 chest print, rubber back-neck tag.",
    images: [
      "/products/essentials-77-tee-black.png",
      "/products/essentials-77-tee-black-hover.png",
      "/products/essentials-77-tee-black-neck.png",
      "/products/essentials-77-tee-black-tag.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "tee", "black", "77", "fog"],
  },
  {
    id: "p-31",
    slug: "prada-triangle-tee-black",
    name: "Prada Triangle Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Prada oversized tee. Silver triangle plaque on the left chest, raw distressed hem.",
    images: [
      "/products/prada-triangle-tee-black.png",
      "/products/prada-triangle-tee-black-hover.png",
      "/products/prada-triangle-tee-black-logo.png",
      "/products/prada-triangle-tee-black-neck.png",
    ],
    brand: "Prada",
    condition: "Like New",
    featured: true,
    tags: ["prada", "tee", "black", "triangle"],
  },
  {
    id: "p-34",
    slug: "essentials-tank-black",
    name: "Essentials Tank Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Fear of God Essentials tank. Rubber chest badge, dropped armholes, heavy jersey.",
    images: [
      "/products/essentials-tank-black.png",
      "/products/essentials-tank-black-back.png",
      "/products/essentials-tank-black-neck.png",
      "/products/essentials-tank-black-tag.png",
    ],
    brand: "Fear of God Essentials",
    condition: "Like New",
    featured: true,
    tags: ["essentials", "tank", "black", "fog"],
  },
  {
    id: "p-35",
    slug: "celine-hoodie-black",
    name: "Celine Hoodie Black",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Celine pullover. Tonal chest lettering, clean fleece, oversized street cut.",
    images: [
      "/products/celine-hoodie-black.png",
      "/products/celine-hoodie-black-back.png",
      "/products/celine-hoodie-black-tag.png",
      "/products/celine-hoodie-black-hood.png",
    ],
    brand: "Celine",
    condition: "Like New",
    featured: true,
    tags: ["celine", "hoodie", "black"],
  },
  {
    id: "p-36",
    slug: "dior-couture-hoodie-grey",
    name: "Dior Couture Hoodie Grey",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Heather grey Dior hoodie. CHRISTIAN DIOR COUTURE chest print, tonal fleece.",
    images: [
      "/products/dior-couture-hoodie-grey.png",
      "/products/dior-couture-hoodie-grey-back.png",
      "/products/dior-couture-hoodie-grey-logo.png",
      "/products/dior-couture-hoodie-grey-hood.png",
    ],
    brand: "Dior",
    condition: "Like New",
    featured: true,
    tags: ["dior", "hoodie", "grey", "couture"],
  },
  {
    id: "p-37",
    slug: "sp5der-web-tee-green",
    name: "Sp5der Web Tee Green",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Green Sp5der tee. Full spiderweb graphic across the chest, heavyweight cotton.",
    images: [
      "/products/sp5der-web-tee-green.png",
      "/products/sp5der-web-tee-green-back.png",
      "/products/sp5der-web-tee-green-neck.png",
      "/products/sp5der-web-tee-green-tag.png",
    ],
    brand: "Sp5der",
    condition: "Like New",
    featured: true,
    tags: ["sp5der", "tee", "green", "web"],
  },
  {
    id: "p-38",
    slug: "sp5der-web-tee-black",
    name: "Sp5der Web Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Sp5der tee. Color spiderweb print on the chest, boxy street cut.",
    images: [
      "/products/sp5der-web-tee-black.png",
      "/products/sp5der-web-tee-black-back.png",
      "/products/sp5der-web-tee-black-neck.png",
      "/products/sp5der-web-tee-black-detail.png",
    ],
    brand: "Sp5der",
    condition: "Like New",
    featured: true,
    tags: ["sp5der", "tee", "black", "web"],
  },
  {
    id: "p-39",
    slug: "sp5der-555-tee-white",
    name: "Sp5der 555 Tee White",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Sp5der tee. 555 spider graphic on the chest, printed web details.",
    images: [
      "/products/sp5der-555-tee-white.png",
      "/products/sp5der-555-tee-white-back.png",
      "/products/sp5der-555-tee-white-neck.png",
      "/products/sp5der-555-tee-white-tag.png",
      "/products/sp5der-555-tee-white-logo.png",
    ],
    brand: "Sp5der",
    condition: "Like New",
    featured: true,
    tags: ["sp5der", "tee", "white", "555"],
  },
  {
    id: "p-40",
    slug: "sp5der-web-shorts-black",
    name: "Sp5der Web Shorts Black",
    price: 0,
    category: "shorts",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Sp5der fleece shorts. Spiderweb print on the leg, elastic drawstring waist.",
    images: [
      "/products/sp5der-web-shorts-black.png",
      "/products/sp5der-web-shorts-black-back.png",
      "/products/sp5der-web-shorts-black-detail.png",
      "/products/sp5der-web-shorts-black-tag.png",
    ],
    brand: "Sp5der",
    condition: "Like New",
    featured: true,
    tags: ["sp5der", "shorts", "black", "web"],
  },
  {
    id: "p-41",
    slug: "sp5der-jeffery-hoodie-black",
    name: "Sp5der Jeffery Hoodie Black",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Sp5der pullover. Yellow Jeffery script, grey web, puffy white stars.",
    images: [
      "/products/sp5der-jeffery-hoodie-black.png",
      "/products/sp5der-jeffery-hoodie-black-back.png",
      "/products/sp5der-jeffery-hoodie-black-logo.png",
      "/products/sp5der-jeffery-hoodie-black-tag.png",
    ],
    brand: "Sp5der",
    condition: "Like New",
    featured: true,
    tags: ["sp5der", "hoodie", "black", "jeffery"],
  },
  {
    id: "p-42",
    slug: "polo-classic-polo-black",
    name: "Polo Classic Polo Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black pique polo. Red pony, white buttons, ribbed collar. Classic cut.",
    images: [
      "/products/polo-classic-polo-black.png",
      "/products/polo-classic-polo-black-back.png",
      "/products/polo-classic-polo-black-logo.png",
      "/products/polo-classic-polo-black-tag.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "polo shirt", "black", "pique"],
  },
  {
    id: "p-43",
    slug: "stone-island-quarterzip-black",
    name: "Stone Island Quarter-Zip Black",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Stone Island sweat quarter-zip. Compass patch on the arm, funnel neck.",
    images: [
      "/products/stone-island-quarterzip-black.png",
      "/products/stone-island-quarterzip-black-back.png",
      "/products/stone-island-quarterzip-black-neck.png",
      "/products/stone-island-quarterzip-black-patch.png",
      "/products/stone-island-quarterzip-black-tag.png",
    ],
    brand: "Stone Island",
    condition: "Like New",
    featured: true,
    tags: ["stone island", "quarter-zip", "black", "compass"],
  },
  {
    id: "p-44",
    slug: "prada-cable-crew-white",
    name: "Prada Cable Crew White",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "White Prada cable-knit crew. Triangle plaque at the neck, heavy cotton knit.",
    images: [
      "/products/prada-cable-crew-white.png",
      "/products/prada-cable-crew-white-back.png",
      "/products/prada-cable-crew-white-neck.png",
      "/products/prada-cable-crew-white-tag.png",
    ],
    brand: "Prada",
    condition: "Like New",
    featured: true,
    tags: ["prada", "cable", "crew", "white"],
  },
  {
    id: "p-45",
    slug: "prada-cable-crew-black",
    name: "Prada Cable Crew Black",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Prada cable-knit crew. Triangle plaque at the neck, heavy cotton knit.",
    images: [
      "/products/prada-cable-crew-black.png",
      "/products/prada-cable-crew-black-back.png",
      "/products/prada-cable-crew-black-neck.png",
      "/products/prada-cable-crew-black-label.png",
      "/products/prada-cable-crew-black-tag.png",
    ],
    brand: "Prada",
    condition: "Like New",
    featured: true,
    tags: ["prada", "cable", "crew", "black"],
  },
  {
    id: "p-46",
    slug: "louis-vuitton-mushroom-tee",
    name: "Louis Vuitton Mushroom Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Louis Vuitton knit tee. Monogram mushroom graphic on the chest.",
    images: [
      "/products/louis-vuitton-mushroom-tee.png",
      "/products/louis-vuitton-mushroom-tee-back.png",
      "/products/louis-vuitton-mushroom-tee-neck.png",
      "/products/louis-vuitton-mushroom-tee-logo.png",
    ],
    brand: "Louis Vuitton",
    condition: "Like New",
    featured: true,
    tags: ["louis vuitton", "tee", "black", "mushroom", "lv"],
  },
  {
    id: "p-47",
    slug: "louis-vuitton-monogram-tee",
    name: "Louis Vuitton Monogram Tee Black",
    price: 0,
    category: "tees",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Louis Vuitton knit tee. Tonal all-over LV monogram, ribbed collar.",
    images: [
      "/products/louis-vuitton-monogram-tee.png",
      "/products/louis-vuitton-monogram-tee-detail.png",
      "/products/louis-vuitton-monogram-tee-neck.png",
      "/products/louis-vuitton-monogram-tee-tag.png",
    ],
    brand: "Louis Vuitton",
    condition: "Like New",
    featured: true,
    tags: ["louis vuitton", "tee", "black", "monogram", "lv"],
  },
  {
    id: "p-48",
    slug: "polo-cable-quarterzip-navy",
    name: "Polo Cable Quarter-Zip Navy",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Navy cable-knit quarter-zip with funnel neck and red pony. Heavy knit.",
    images: [
      "/products/polo-cable-quarterzip-navy.png",
      "/products/polo-cable-quarterzip-navy-back.png",
      "/products/polo-cable-quarterzip-navy-neck.png",
      "/products/polo-cable-quarterzip-navy-zip.png",
      "/products/polo-cable-quarterzip-navy-tag.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "navy"],
  },
  {
    id: "p-49",
    slug: "polo-cable-quarterzip-olive",
    name: "Polo Cable Quarter-Zip Olive",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Olive cable-knit quarter-zip with funnel neck and red pony. Heavy knit.",
    images: [
      "/products/polo-cable-quarterzip-olive.png",
      "/products/polo-cable-quarterzip-olive-back.png",
      "/products/polo-cable-quarterzip-olive-neck.png",
      "/products/polo-cable-quarterzip-olive-zip.png",
      "/products/polo-cable-quarterzip-olive-tag.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "olive"],
  },
  {
    id: "p-50",
    slug: "polo-cable-quarterzip-red",
    name: "Polo Cable Quarter-Zip Red",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Red cable-knit quarter-zip with funnel neck and navy pony. Heavy knit.",
    images: [
      "/products/polo-cable-quarterzip-red.png",
      "/products/polo-cable-quarterzip-red-back.png",
      "/products/polo-cable-quarterzip-red-neck.png",
      "/products/polo-cable-quarterzip-red-tag.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "red"],
  },
  {
    id: "p-51",
    slug: "polo-cable-quarterzip-sky",
    name: "Polo Cable Quarter-Zip Sky",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Sky-blue cable-knit quarter-zip with funnel neck and red pony. Heavy knit.",
    images: [
      "/products/polo-cable-quarterzip-sky.png",
      "/products/polo-cable-quarterzip-sky-back.png",
      "/products/polo-cable-quarterzip-sky-neck.png",
      "/products/polo-cable-quarterzip-sky-tag.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "sky", "blue"],
  },
  {
    id: "p-52",
    slug: "polo-cable-quarterzip-grey",
    name: "Polo Cable Quarter-Zip Grey",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Grey cable-knit quarter-zip with funnel neck and red pony. Heavy knit.",
    images: [
      "/products/polo-cable-quarterzip-grey.png",
      "/products/polo-cable-quarterzip-grey-back.png",
      "/products/polo-cable-quarterzip-grey-neck.png",
      "/products/polo-cable-quarterzip-grey-tag.png",
      "/products/polo-cable-quarterzip-grey-zip.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "grey"],
  },
  {
    id: "p-53",
    slug: "polo-cable-quarterzip-cream",
    name: "Polo Cable Quarter-Zip Cream",
    price: 0,
    category: "knitwear",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Cream cable-knit quarter-zip with funnel neck and navy pony. Heavy knit.",
    images: [
      "/products/polo-cable-quarterzip-cream.png",
      "/products/polo-cable-quarterzip-cream-back.png",
      "/products/polo-cable-quarterzip-cream-tag.png",
      "/products/polo-cable-quarterzip-cream-neck.png",
    ],
    brand: "Polo Ralph Lauren",
    condition: "Like New",
    featured: true,
    tags: ["polo", "cable", "quarter-zip", "cream"],
  },
  {
    id: "p-54",
    slug: "acne-studios-zip-hoodie-black",
    name: "Acne Studios Zip Hoodie Black",
    price: 0,
    category: "hoodies",
    sizes: ["S", "M", "L", "XL", "2XL"],
    description:
      "Black Acne Studios zip hoodie. Distressed wash, pink back logo, metal zip.",
    images: [
      "/products/acne-studios-zip-hoodie-black.png",
      "/products/acne-studios-zip-hoodie-black-back.png",
      "/products/acne-studios-zip-hoodie-black-neck.png",
      "/products/acne-studios-zip-hoodie-black-tag.png",
    ],
    brand: "Acne Studios",
    condition: "Like New",
    featured: true,
    tags: ["acne studios", "hoodie", "black", "zip"],
  },
];

const catalogLookSlugs = [
  "polo-white-zip",
  "polo-black-quarterzip",
  "polo-white-crew",
  "polo-navy-crew",
  "essentials-tee-black",
  "essentials-tee-taupe",
  "essentials-hoodie-grey",
  "essentials-shorts-black",
  "essentials-shorts-grey",
  "chrome-hearts-horseshoe-tee-white",
  "chrome-hearts-horseshoe-tee-black",
  "chrome-hearts-scribble-tee-white",
  "chrome-hearts-scribble-tee-black",
  "chrome-hearts-crosses-tee-white",
  "chrome-hearts-crosses-tee-black",
  "chrome-hearts-rainbow-tee-white",
  "chrome-hearts-rainbow-tee-black",
  "chrome-hearts-drip-tee-white",
  "chrome-hearts-drip-tee-black",
  "chrome-hearts-floral-tee-white",
  "chrome-hearts-floral-tee-black",
  "chrome-hearts-triple-cross-tee-white",
  "chrome-hearts-triple-cross-tee-black",
  "fog-213-hoodie-cream",
  "essentials-crew-charcoal",
  "essentials-hoodie-cream",
  "essentials-sweatpants-brown",
  "fog-new-york-tee-black",
  "essentials-77-tee-black",
  "prada-triangle-tee-black",
  "essentials-tank-black",
  "celine-hoodie-black",
  "dior-couture-hoodie-grey",
  "sp5der-web-tee-green",
  "sp5der-web-tee-black",
  "sp5der-555-tee-white",
  "sp5der-web-shorts-black",
  "sp5der-jeffery-hoodie-black",
  "polo-classic-polo-black",
  "stone-island-quarterzip-black",
  "prada-cable-crew-white",
  "prada-cable-crew-black",
  "louis-vuitton-mushroom-tee",
  "louis-vuitton-monogram-tee",
  "polo-cable-quarterzip-navy",
  "polo-cable-quarterzip-olive",
  "polo-cable-quarterzip-red",
  "polo-cable-quarterzip-sky",
  "polo-cable-quarterzip-grey",
  "polo-cable-quarterzip-cream",
  "acne-studios-zip-hoodie-black",
];

function extraAllowedForGender(src: string, suffix: "w" | "m"): boolean {
  if (suffix === "w") {
    return !src.endsWith("-m.png") && !maleOnModelExtras.has(src);
  }
  return !src.endsWith("-w.png");
}

function toOnModelImages(images: string[], suffix: "w" | "m"): string[] {
  const productShot = images[0] ?? "";
  const hasLook = catalogLookSlugs.some((slug) => productShot.includes(slug));
  const extras = images
    .slice(1)
    .filter((src) => extraAllowedForGender(src, suffix));
  if (!hasLook) return [productShot, ...extras].filter(Boolean);
  const onModel = productShot.replace(/\.png$/, `-${suffix}.png`);
  return [productShot, onModel, ...extras.filter((src) => src !== onModel)];
}

export const products: Product[] = [
  ...menCatalog.map((p) => ({
    ...p,
    gender: "men" as const,
    images: toOnModelImages(p.images, "m"),
  })),
  ...menCatalog.map((p) => ({
    ...p,
    id: `${p.id}-w`,
    gender: "women" as const,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"] as Product["sizes"],
    images: toOnModelImages(p.images, "w"),
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
