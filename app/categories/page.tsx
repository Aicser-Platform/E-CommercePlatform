import Link from "next/link";
import { StoreLayout } from "@/components/store-layout";
import { 
  Smartphone, 
  Home, 
  Shirt, 
  Dumbbell, 
  Heart, 
  Armchair,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";

const categoryData = [
  {
    name: "Electronics",
    icon: Smartphone,
    description: "Phones, laptops, headphones, and more tech gadgets",
    href: "/products?category=Electronics",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    name: "Home & Kitchen",
    icon: Home,
    description: "Everything you need to make your house a home",
    href: "/products?category=Home+%26+Kitchen",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    name: "Fashion",
    icon: Shirt,
    description: "Clothing, bags, accessories, and style essentials",
    href: "/products?category=Fashion",
    color: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    description: "Fitness equipment, outdoor gear, and sportswear",
    href: "/products?category=Sports",
    color: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  {
    name: "Health",
    icon: Heart,
    description: "Supplements, wellness products, and health essentials",
    href: "/products?category=Health",
    color: "bg-red-500/10 text-red-600 border-red-500/20",
  },
  {
    name: "Furniture",
    icon: Armchair,
    description: "Chairs, desks, and furniture for every room",
    href: "/products?category=Furniture",
    color: "bg-primary/10 text-primary border-primary/20",
  },
];

export default function CategoriesPage() {
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Shop by Category
          </h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Browse through our diverse categories to find exactly what you&apos;re looking for
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((category) => {
            const Icon = category.icon;
            const count = products.filter(p => p.category === category.name).length;
            
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-xl border transition-transform group-hover:scale-110",
                    category.color
                  )}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <p className="text-sm font-medium text-primary">
                  {count} products available
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </StoreLayout>
  );
}
