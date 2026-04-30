// ── Unified Product Store ──
// Single source of truth: localStorage "ec_products"
// Falls back to DEFAULT_PRODUCTS if empty

const DEFAULT_PRODUCTS = [
{
    id: "black-tee",
    name: "Raw Black T-Shirt Lineup",
    price: 3000,
    category: "tshirts",
    colors: ["#0a0a0a",  "#ffffff"],
    colorNames: ["Black", "White"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://i.pinimg.com/1200x/94/f5/a0/94f5a0c9f1cbe18c186c0329d2e99ea8.jpg",
    images: [
      "https://i.pinimg.com/1200x/94/f5/a0/94f5a0c9f1cbe18c186c0329d2e99ea8.jpg",
      "https://i.pinimg.com/1200x/6a/f2/cc/6af2cc207f408f8f3bd554188b23271b.jpg",
    ],
    rating: 4.2,
    reviews: 51,
    inStock: true,
    badge: "Best Seller",
    description: "Elevate your everyday style with our Men's Black T-Shirt — the ultimate wardrobe essential for modern men. Crafted with meticulous attention to detail and designed for comfort, these wardrobe black tees will be a must-have addition to your collection.",
    features: ["Premium Quality", "Pre-washed Aluminate Drapier", "Available in Various Sizes", "Tailored Fit"]
  },
  {
    id: "Block-Round",
    name: "Block Round Neck Tee",
    price: 3500,
    category: "tshirts",
    colors: ["#1b1b1b"],
    colorNames: ["Brown"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://i.pinimg.com/1200x/7c/69/74/7c6974f728649407513b2d821dbb9d09.jpg",
    images: [
      "https://i.pinimg.com/1200x/7c/69/74/7c6974f728649407513b2d821dbb9d09.jpg",
    ],
    rating: 4.5,
    reviews: 38,
    inStock: true,
    badge: null,
    description: "A classic monochromatic wardrobe staple that goes with everything. Simple, clean, and effortlessly stylish.",
    features: ["Soft Cotton Blend", "Relaxed Fit", "Pre-washed", "Machine Washable"]
  },
  {
    id: "essential-neutrals",
    name: "Essential Neutrals",
    price: 2000,
    category: "tshirts",
    colors: ["#f3f4f6", "#ffffff", "#d1d5db"],
    colorNames: ["Light Gray", "White", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://i.pinimg.com/736x/b1/44/b1/b144b16ae18e9a0d47df53b4a7fbc959.jpg",
    images: [
      "https://i.pinimg.com/736x/b1/44/b1/b144b16ae18e9a0d47df53b4a7fbc959.jpg",
    ],
    rating: 4.0,
    reviews: 24,
    inStock: true,
    badge: null,
    description: "Essential neutral tones for the minimalist wardrobe. These tees are versatile enough to pair with anything.",
    features: ["Lightweight Fabric", "Breathable", "True to Size", "Easy Care"]
  },
  {
    id: "ultranet-black",
    name: "ULTRANET Black",
    price: 3000,
    category: "tshirts",
    colors: ["#0a0a0a"],
    colorNames: ["Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://i.pinimg.com/736x/7d/61/b5/7d61b52c030b0e2c097f9ff6e873f1bd.jpg",
    images: [
      "https://i.pinimg.com/736x/7d/61/b5/7d61b52c030b0e2c097f9ff6e873f1bd.jpg",
    ],
    rating: 4.7,
    reviews: 63,
    inStock: true,
    badge: "New",
    description: "The ULTRANET Black — premium mesh construction meets streetwear aesthetics. Breathable, bold, and unmistakable.",
    features: ["Mesh Construction", "Streetwear Fit", "Durable Print", "Slim Cut"]
  },
  {
    id: "elegant-ebony",
    name: "Elegant Ebony Sweatshirts",
    price: 3000,
    category: "sweatshirts",
    colors: ["#0a0a0a", "#374151"],
    colorNames: ["Black", "Dark Gray"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://i.pinimg.com/1200x/f2/cf/f1/f2cff143a07e663d292a9133913eb0a3.jpg",
    images: [
      "https://i.pinimg.com/1200x/f2/cf/f1/f2cff143a07e663d292a9133913eb0a3.jpg",
    ],
    rating: 4.3,
    reviews: 18,
    inStock: true,
    badge: null,
    description: "Luxurious ebony sweatshirt for colder days. Soft fleece interior with a refined exterior finish.",
    features: ["Fleece Interior", "Ribbed Cuffs", "Kangaroo Pocket", "Oversized Fit"]
  },
  {
    id: "sleek-cozy-black",
    name: "Sleek and Cozy Black",
    price: 5000,
    category: "hoodies",
    colors: ["#0a0a0a"],
    colorNames: ["Black"],
    sizes: ["M", "L", "XL", "XXL"],
    image: "https://i.pinimg.com/736x/8e/60/90/8e609035bace0110e49d743b03b46344.jpg",
    images: [
      "https://i.pinimg.com/736x/8e/60/90/8e609035bace0110e49d743b03b46344.jpg",
      "https://i.pinimg.com/736x/33/ba/7d/33ba7d72eb8899ab51afde74597b88ee.jpg",
    ],
    rating: 4.6,
    reviews: 42,
    inStock: true,
    badge: "Featured",
    description: "The sleekest, coziest hoodie in our collection. Perfect for lounging or heading out in style.",
    features: ["Heavyweight Cotton", "Double-lined Hood", "YKK Zipper", "Relaxed Fit"]
  },
  {
    id: "raw-black-tees",
    name: "Raw Black Tees",
    price: 1500,
    category: "tshirts",
    colors: ["#0a0a0a", "#374151"],
    colorNames: ["Black", "Charcoal"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://i.pinimg.com/1200x/89/3a/33/893a331de4803446c184b7b154a545c9.jpg",
    images: [
      "https://i.pinimg.com/1200x/89/3a/33/893a331de4803446c184b7b154a545c9.jpg",
    ],
    rating: 3.9,
    reviews: 11,
    inStock: true,
    badge: null,
    description: "Raw, unfinished edges meet clean minimalist design. These tees are for those who appreciate the beauty in simplicity.",
    features: ["Raw Hem Edges", "Boxy Fit", "100% Cotton", "Garment Dyed"]
  },
  {
    id: "mockup-black",
    name: "MOCKUP Black",
    price: 2500,
    category: "tshirts",
    colors: ["#0a0a0a"],
    colorNames: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://i.pinimg.com/736x/9b/62/c7/9b62c786e9a42844313f15cbde0cc046.jpg",
    images: [
      "https://i.pinimg.com/736x/9b/62/c7/9b62c786e9a42844313f15cbde0cc046.jpg",
    ],
    rating: 4.1,
    reviews: 29,
    inStock: true,
    badge: null,
    description: "Clean canvas tee with bold mockup branding. A statement piece that speaks through its simplicity.",
    features: ["Bold Branding", "Standard Fit", "Soft Handle", "Pre-shrunk"]
  },
  {
    id: "athletic-shirt",
    name: "Athletic Shirt",
    price: 3500,
    category: "tshirts",
    colors: ["#f3f4f6", "#0a0a0a", "#1d4ed8"],
    colorNames: ["White", "Black", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://i.pinimg.com/736x/6a/2e/25/6a2e2542940ca69bf1b9861a06ad15c7.jpg",
    images: [
      "https://i.pinimg.com/736x/6a/2e/25/6a2e2542940ca69bf1b9861a06ad15c7.jpg",
    ],
    rating: 4.4,
    reviews: 55,
    inStock: true,
    badge: null,
    description: "Performance-ready athletic shirt for the active lifestyle. Moisture-wicking fabric keeps you cool and comfortable.",
    features: ["Moisture-Wicking", "Four-Way Stretch", "Anti-Odor", "Quick Dry"]
  },
];

// ── Get all products (localStorage first, fallback to defaults) ──
function getAllProducts() {
  const stored = localStorage.getItem("ec_admin_products");
  if (stored) {
    const adminProds = JSON.parse(stored);
    if (adminProds.length > 0) {
      // Normalize admin products to match website product format
      return adminProds.map(p => ({
        id: p.id,
        name: p.name,
        price: parseFloat(p.price) || 0,
        category: (p.category || "tshirts").toLowerCase().replace(/[^a-z]/g, ""),
        colors: p.colors || ["#0a0a0a"],
        colorNames: p.colorNames || ["Black"],
        sizes: p.sizes || ["S", "M", "L", "XL"],
        image: p.image || `https://placehold.co/400x400/1a1a1a/fff?text=${encodeURIComponent(p.name||"P")}`,
        images: p.images || [p.image || `https://placehold.co/600x600/1a1a1a/fff?text=${encodeURIComponent(p.name||"P")}`],
        rating: p.rating || 4.0,
        reviews: p.reviews || 0,
        inStock: p.stock !== "Out of Stock",
        badge: p.badge || null,
        description: p.description || "",
        features: p.features || []
      }));
    }
  }
  return DEFAULT_PRODUCTS;
}

// Keep PRODUCTS as a live getter array proxy
let PRODUCTS = getAllProducts();

function refreshProducts() {
  PRODUCTS = getAllProducts();
}

function getProductById(id) {
  return getAllProducts().find(p => p.id === id) || null;
}

function getProductsByCategory(cat) {
  const all = getAllProducts();
  if (!cat || cat === "all") return all;
  return all.filter(p => p.category === cat);
}

function searchProducts(query) {
  const q = query.toLowerCase();
  return getAllProducts().filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
}

function getRelatedProducts(id, limit = 4) {
  const product = getProductById(id);
  if (!product) return [];
  return getAllProducts().filter(p => p.id !== id && p.category === product.category).slice(0, limit);
}
