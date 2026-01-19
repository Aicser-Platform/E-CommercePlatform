export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviews: number;
  badge?: "sale" | "new" | "bestseller";
  inStock: boolean;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  features?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-canceling headphones with 30-hour battery life",
    longDescription: "Experience audio excellence with our premium wireless Bluetooth headphones. Featuring advanced Active Noise Cancellation technology, these headphones block out distractions so you can focus on what matters most. With an impressive 30-hour battery life, you can enjoy your music all day long without worrying about recharging. The cushioned ear cups provide exceptional comfort for extended listening sessions, while the foldable design makes them perfect for travel.",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.8,
    reviews: 234,
    badge: "sale",
    inStock: true,
    colors: [
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Pearl White", hex: "#f5f5f5" },
      { name: "Ocean Blue", hex: "#1e40af" },
    ],
    features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.2", "Foldable design", "Built-in microphone"],
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    longDescription: "Take control of your health and fitness with the Smart Watch Pro. This advanced wearable combines cutting-edge fitness tracking with smart notifications to keep you connected and motivated throughout your day. The built-in GPS accurately tracks your outdoor activities, while the continuous heart rate monitor helps you optimize your workouts. Water-resistant up to 50 meters, it's perfect for swimming and all weather conditions.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    rating: 4.6,
    reviews: 189,
    badge: "new",
    inStock: true,
    sizes: ["40mm", "44mm"],
    colors: [
      { name: "Space Gray", hex: "#4a4a4a" },
      { name: "Silver", hex: "#c0c0c0" },
      { name: "Rose Gold", hex: "#b76e79" },
    ],
    features: ["Heart rate monitor", "Built-in GPS", "Water resistant 50m", "7-day battery", "Sleep tracking"],
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    description: "Programmable 12-cup coffee maker with thermal carafe",
    longDescription: "Start every morning right with our Premium Coffee Maker. This programmable machine brews up to 12 cups of rich, flavorful coffee, keeping it hot for hours in the double-walled thermal carafe. Set the 24-hour programmable timer to wake up to freshly brewed coffee. The adjustable brew strength selector lets you customize your coffee from mild to bold, while the pause-and-pour feature allows you to grab a cup mid-brew.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.5,
    reviews: 312,
    badge: "bestseller",
    inStock: true,
    colors: [
      { name: "Stainless Steel", hex: "#8c8c8c" },
      { name: "Matte Black", hex: "#2d2d2d" },
    ],
    features: ["12-cup capacity", "Thermal carafe", "24-hour programmable", "Adjustable brew strength", "Auto shut-off"],
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    description: "Adjustable lumbar support with breathable mesh back",
    longDescription: "Transform your workspace with our Ergonomic Office Chair, designed to support you through long work hours. The adjustable lumbar support conforms to your lower back, while the breathable mesh back keeps you cool and comfortable. With multiple adjustment points including seat height, armrests, and tilt tension, you can customize every aspect of your seating experience. The heavy-duty base and smooth-rolling casters ensure stability and mobility.",
    price: 349.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
    category: "Furniture",
    rating: 4.7,
    reviews: 156,
    badge: "sale",
    inStock: true,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Gray", hex: "#6b7280" },
      { name: "Blue", hex: "#3b82f6" },
    ],
    features: ["Adjustable lumbar support", "Breathable mesh back", "360° swivel", "Adjustable armrests", "Heavy-duty base"],
  },
  {
    id: "5",
    name: "Portable Power Bank",
    description: "20000mAh fast charging with dual USB ports",
    longDescription: "Never run out of power on the go with our high-capacity Portable Power Bank. Packing 20000mAh of power, it can charge your smartphone up to 5 times before needing a recharge. Dual USB ports allow you to charge two devices simultaneously, while fast-charging technology ensures your devices power up quickly. The sleek, compact design fits easily in your bag, and the LED indicator shows remaining battery life at a glance.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.4,
    reviews: 445,
    inStock: true,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    features: ["20000mAh capacity", "Dual USB ports", "Fast charging", "LED indicator", "Compact design"],
  },
  {
    id: "6",
    name: "Leather Messenger Bag",
    description: "Genuine leather bag with laptop compartment",
    longDescription: "Elevate your professional style with our handcrafted Leather Messenger Bag. Made from premium full-grain leather, this bag develops a beautiful patina over time. The padded laptop compartment fits devices up to 15 inches, while multiple pockets keep your essentials organized. The adjustable shoulder strap and top handle provide versatile carrying options. Perfect for the office, travel, or everyday use.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.9,
    reviews: 89,
    badge: "new",
    inStock: true,
    colors: [
      { name: "Cognac", hex: "#8b4513" },
      { name: "Dark Brown", hex: "#3d2314" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    features: ["Full-grain leather", "Fits 15\" laptop", "Adjustable strap", "Multiple pockets", "Brass hardware"],
  },
  {
    id: "7",
    name: "Wireless Gaming Mouse",
    description: "16000 DPI optical sensor with RGB lighting",
    longDescription: "Dominate the competition with our high-performance Wireless Gaming Mouse. The precision 16000 DPI optical sensor delivers pixel-perfect accuracy, while the ultra-fast wireless connection ensures zero lag. Customize the RGB lighting with 16.8 million colors to match your setup, and program the 6 buttons to your favorite commands. With a 70-hour battery life and ergonomic design, you'll stay comfortable through marathon gaming sessions.",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 267,
    badge: "sale",
    inStock: true,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#f5f5f5" },
    ],
    features: ["16000 DPI sensor", "RGB lighting", "6 programmable buttons", "70-hour battery", "Ergonomic design"],
  },
  {
    id: "8",
    name: "Plant-Based Protein Powder",
    description: "Organic vanilla protein with 25g per serving",
    longDescription: "Fuel your fitness goals with our Plant-Based Protein Powder. Each serving delivers 25g of complete protein from organic pea, rice, and hemp sources. The smooth vanilla flavor mixes easily with water, milk, or your favorite smoothie ingredients. Free from artificial sweeteners, colors, and preservatives, it's a clean protein choice for athletes and health-conscious individuals alike. Perfect for post-workout recovery or a nutritious meal replacement.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop",
    category: "Health",
    rating: 4.3,
    reviews: 198,
    inStock: true,
    sizes: ["1 lb", "2 lb", "5 lb"],
    features: ["25g protein per serving", "Organic ingredients", "No artificial additives", "Easy mixing", "Vegan friendly"],
  },
  {
    id: "9",
    name: "Minimalist Desk Lamp",
    description: "LED desk lamp with adjustable brightness and color temperature",
    longDescription: "Illuminate your workspace with our elegant Minimalist Desk Lamp. The energy-efficient LED provides bright, flicker-free light that's easy on your eyes during long work sessions. Choose from 5 brightness levels and 3 color temperatures to create the perfect ambiance. The flexible gooseneck allows precise positioning, while the touch-sensitive controls make adjustments effortless. The compact base includes a USB charging port for your devices.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.5,
    reviews: 134,
    badge: "bestseller",
    inStock: true,
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Silver", hex: "#c0c0c0" },
    ],
    features: ["5 brightness levels", "3 color temperatures", "Flexible gooseneck", "Touch controls", "USB charging port"],
  },
  {
    id: "10",
    name: "Yoga Mat Premium",
    description: "Extra thick non-slip yoga mat with carrying strap",
    longDescription: "Enhance your practice with our Premium Yoga Mat. The extra-thick 6mm cushioning provides superior joint protection during floor poses, while the textured non-slip surface ensures stability in every position. Made from eco-friendly TPE material, it's free from harmful chemicals and easy to clean. The included carrying strap makes transport to the studio effortless. Perfect for yoga, Pilates, stretching, and meditation.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.7,
    reviews: 223,
    inStock: true,
    colors: [
      { name: "Sage Green", hex: "#9caf88" },
      { name: "Ocean Blue", hex: "#4a90a4" },
      { name: "Dusty Rose", hex: "#d4a5a5" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    features: ["6mm thickness", "Non-slip texture", "Eco-friendly TPE", "Carrying strap included", "Easy to clean"],
  },
  {
    id: "11",
    name: "Stainless Steel Water Bottle",
    description: "Insulated 32oz bottle keeps drinks cold for 24 hours",
    longDescription: "Stay hydrated in style with our double-wall insulated Stainless Steel Water Bottle. The vacuum insulation keeps drinks cold for 24 hours or hot for 12 hours. The wide mouth makes filling and cleaning easy, while the leak-proof lid ensures no spills in your bag. Made from food-grade 18/8 stainless steel, it's BPA-free and won't retain flavors. The powder-coated exterior provides a comfortable grip and resists scratches.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.8,
    reviews: 567,
    badge: "bestseller",
    inStock: true,
    sizes: ["24oz", "32oz", "40oz"],
    colors: [
      { name: "Matte Black", hex: "#2d2d2d" },
      { name: "Arctic White", hex: "#f8f8f8" },
      { name: "Ocean Teal", hex: "#008b8b" },
      { name: "Coral", hex: "#ff6b6b" },
    ],
    features: ["24hr cold / 12hr hot", "Double-wall vacuum", "BPA-free", "Leak-proof lid", "Wide mouth"],
  },
  {
    id: "12",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches",
    longDescription: "Experience the satisfying feel of mechanical typing with our RGB Backlit Keyboard. The tactile blue switches provide audible feedback and a crisp actuation point, perfect for typing and gaming. Customize the per-key RGB lighting with millions of colors and effects. The aircraft-grade aluminum frame ensures durability, while the detachable USB-C cable adds convenience. N-key rollover ensures every keystroke is registered, no matter how fast you type.",
    price: 119.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.6,
    reviews: 312,
    badge: "sale",
    inStock: true,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#f5f5f5" },
    ],
    features: ["Blue mechanical switches", "Per-key RGB lighting", "Aluminum frame", "Detachable USB-C", "N-key rollover"],
  },
  {
    id: "13",
    name: "Aromatherapy Diffuser",
    description: "Ultrasonic essential oil diffuser with LED lights",
    longDescription: "Transform any room into a spa-like retreat with our Aromatherapy Diffuser. The ultrasonic technology creates a fine, cool mist that disperses your favorite essential oils throughout the space. Choose from 7 ambient LED light colors to set the mood, or turn off the light for silent nighttime operation. The 300ml tank runs for up to 10 hours on low mist setting, and the auto shut-off feature ensures safety when the water runs out.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.4,
    reviews: 189,
    inStock: true,
    colors: [
      { name: "Natural Wood", hex: "#deb887" },
      { name: "White", hex: "#ffffff" },
      { name: "Dark Wood", hex: "#5c4033" },
    ],
    features: ["300ml capacity", "7 LED colors", "10hr runtime", "Ultra-quiet", "Auto shut-off"],
  },
  {
    id: "14",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with active noise cancellation",
    longDescription: "Immerse yourself in pure audio with our True Wireless Earbuds. Advanced Active Noise Cancellation blocks out ambient noise, while Transparency mode lets you hear your surroundings when needed. The ergonomic design with multiple ear tip sizes ensures a secure, comfortable fit for all-day wear. With 6 hours of playback and an additional 24 hours from the charging case, you'll never miss a beat. Touch controls and voice assistant integration put everything at your fingertips.",
    price: 179.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.7,
    reviews: 445,
    badge: "sale",
    inStock: true,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    features: ["Active Noise Cancellation", "30hr total battery", "Touch controls", "Voice assistant", "IPX4 water resistant"],
  },
  {
    id: "15",
    name: "Canvas Backpack",
    description: "Vintage style canvas backpack with laptop sleeve",
    longDescription: "Combine timeless style with modern functionality in our Vintage Canvas Backpack. The durable waxed canvas exterior ages beautifully over time, while the padded interior sleeve protects laptops up to 15 inches. Multiple compartments and pockets keep your gear organized, and the reinforced leather straps ensure comfortable all-day carrying. Whether you're commuting, traveling, or heading to campus, this versatile backpack has you covered.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Fashion",
    rating: 4.5,
    reviews: 156,
    badge: "new",
    inStock: true,
    colors: [
      { name: "Army Green", hex: "#4b5320" },
      { name: "Navy Blue", hex: "#1e3a5f" },
      { name: "Gray", hex: "#6b7280" },
      { name: "Brown", hex: "#8b4513" },
    ],
    features: ["Waxed canvas", "15\" laptop sleeve", "Leather straps", "Multiple pockets", "Water resistant"],
  },
  {
    id: "16",
    name: "Smart Home Hub",
    description: "Voice-controlled smart home automation center",
    longDescription: "Take control of your entire home with our Smart Home Hub. Compatible with thousands of smart devices from leading brands, it serves as the central command center for your connected home. Use voice commands or the intuitive app to control lights, thermostats, locks, cameras, and more. Set up routines and automations to simplify your daily life, and check in on your home from anywhere with the mobile app. The compact design fits seamlessly into any room.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.3,
    reviews: 234,
    inStock: true,
    colors: [
      { name: "Charcoal", hex: "#36454f" },
      { name: "Chalk", hex: "#f5f5dc" },
    ],
    features: ["Voice control", "Works with 1000+ devices", "Custom routines", "Remote access", "Easy setup"],
  },
  {
    id: "17",
    name: "Ceramic Plant Pot Set",
    description: "Set of 3 minimalist ceramic pots with drainage",
    longDescription: "Bring life to your space with our beautifully crafted Ceramic Plant Pot Set. This set of three pots in graduated sizes (4\", 5\", and 6\") provides the perfect home for your favorite plants. Each pot features a drainage hole and matching bamboo saucer to keep your plants healthy. The matte ceramic finish complements any decor style, from modern minimalist to bohemian. Ideal for succulents, herbs, or small houseplants.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "Home & Kitchen",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Terracotta", hex: "#e2725b" },
      { name: "Sage", hex: "#9caf88" },
      { name: "Charcoal", hex: "#36454f" },
    ],
    features: ["Set of 3 sizes", "Drainage holes", "Bamboo saucers", "Matte finish", "Indoor/outdoor use"],
  },
  {
    id: "18",
    name: "Running Shoes Pro",
    description: "Lightweight running shoes with responsive cushioning",
    longDescription: "Push your limits with our Pro Running Shoes, engineered for serious runners. The responsive foam midsole returns energy with every stride, while the breathable mesh upper keeps your feet cool and comfortable. The rubber outsole provides excellent traction on various surfaces, and the padded collar prevents chafing during long runs. Whether you're training for a marathon or enjoying a casual jog, these shoes deliver performance and comfort.",
    price: 159.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    rating: 4.8,
    reviews: 378,
    badge: "sale",
    inStock: true,
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: [
      { name: "Red/White", hex: "#dc2626" },
      { name: "Black/Gray", hex: "#1f2937" },
      { name: "Blue/White", hex: "#2563eb" },
      { name: "White/Orange", hex: "#f97316" },
    ],
    features: ["Responsive cushioning", "Breathable mesh", "Rubber outsole", "Padded collar", "Lightweight design"],
  },
];

export const categories = [
  "All",
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Sports",
  "Health",
  "Furniture",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {  
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      (p.longDescription && p.longDescription.toLowerCase().includes(lowerQuery))
  );
}

export function filterByPriceRange(products: Product[], minPrice: number, maxPrice: number): Product[] {
  return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
}

export type SortOption = "featured" | "price-low" | "price-high" | "rating" | "newest";

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "newest":
      return sorted.filter((p) => p.badge === "new").concat(sorted.filter((p) => p.badge !== "new"));
    case "featured":
    default:
      // Featured: bestsellers first, then new, then rest
      return sorted.sort((a, b) => {
        if (a.badge === "bestseller" && b.badge !== "bestseller") return -1;
        if (b.badge === "bestseller" && a.badge !== "bestseller") return 1;
        if (a.badge === "new" && b.badge !== "new") return -1;
        if (b.badge === "new" && a.badge !== "new") return 1;
        return 0;
      });
  }
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge === "bestseller" || p.badge === "new").slice(0, 6);
}

export function getDeals(): Product[] {
  return products.filter((p) => p.badge === "sale");
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getAllRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  
  const otherProducts = products.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  
  return [...sameCategory, ...otherProducts].slice(0, limit);
}
