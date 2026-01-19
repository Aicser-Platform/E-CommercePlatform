import { StoreLayout } from "@/components/store-layout";
import { ProductGrid } from "@/components/product-grid";
import { getDeals } from "@/lib/products";
import { Sparkles, Clock, Tag } from "lucide-react";

export default function DealsPage() {
  const dealProducts = getDeals();

  return (
    <StoreLayout>
      {/* Hero Banner */}
      <section className="bg-destructive text-destructive-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Limited Time Only
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Hot Deals & Discounts
            </h1>
            <p className="text-lg text-destructive-foreground/80 max-w-2xl mx-auto text-pretty">
              Save big on your favorite products. These special offers won&apos;t last
              long, so grab them while you can!
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Tag className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  {dealProducts.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Active Deals</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">72h</span>
              </div>
              <p className="text-sm text-muted-foreground">Time Left</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl md:text-3xl font-bold text-primary">50%</span>
              </div>
              <p className="text-sm text-muted-foreground">Max Discount</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <div className="container mx-auto px-4">
        <ProductGrid
          products={dealProducts}
          title="Today's Best Deals"
          description="All products on sale with amazing discounts"
        />
      </div>
    </StoreLayout>
  );
}
