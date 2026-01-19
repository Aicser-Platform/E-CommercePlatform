import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              New Collection Available
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Discover Products That{" "}
              <span className="text-primary">Elevate</span> Your Life
            </h1>
            <p className="text-lg text-background/70 max-w-lg text-pretty">
              Explore our curated collection of premium products. From electronics to
              lifestyle essentials, find everything you need in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-background/30 text-background hover:bg-background/10 bg-transparent"
              >
                <Link href="/deals">View Deals</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl bg-primary/10 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-primary">50%</p>
                    <p className="text-sm text-background/70">Off Selected Items</p>
                  </div>
                </div>
                <div className="aspect-[4/3] rounded-2xl bg-background/5 p-6">
                  <p className="text-sm text-background/70">Trending</p>
                  <p className="text-lg font-semibold mt-1">Electronics</p>
                  <p className="text-3xl font-bold text-primary mt-2">200+</p>
                  <p className="text-sm text-background/70">Products</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[4/3] rounded-2xl bg-background/5 p-6">
                  <p className="text-sm text-background/70">Best Sellers</p>
                  <p className="text-lg font-semibold mt-1">This Month</p>
                  <p className="text-3xl font-bold text-primary mt-2">1.2K</p>
                  <p className="text-sm text-background/70">Orders</p>
                </div>
                <div className="aspect-square rounded-2xl bg-primary/10 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-primary">Free</p>
                    <p className="text-sm text-background/70">Shipping over $100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-background/10 bg-background/5">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-background/60">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Secure Payment</p>
                <p className="text-xs text-background/60">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <RefreshCw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-background/60">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Headphones className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">24/7 Support</p>
                <p className="text-xs text-background/60">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
