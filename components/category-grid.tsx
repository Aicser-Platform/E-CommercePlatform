import Link from "next/link";
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

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    count: 45,
    href: "/products?category=Electronics",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    name: "Home & Kitchen",
    icon: Home,
    count: 32,
    href: "/products?category=Home+%26+Kitchen",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    name: "Fashion",
    icon: Shirt,
    count: 28,
    href: "/products?category=Fashion",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    count: 24,
    href: "/products?category=Sports",
    color: "bg-green-500/10 text-green-600",
  },
  {
    name: "Health",
    icon: Heart,
    count: 18,
    href: "/products?category=Health",
    color: "bg-red-500/10 text-red-600",
  },
  {
    name: "Furniture",
    icon: Armchair,
    count: 15,
    href: "/products?category=Furniture",
    color: "bg-primary/10 text-primary",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Shop by Category
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse our wide selection of categories
          </p>
        </div>
        <Link 
          href="/categories"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                category.color
              )}>
                <Icon className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{category.name}</p>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
