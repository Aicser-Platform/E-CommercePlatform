import { StoreLayout } from "@/components/store-layout";
import { HeroSection } from "@/components/hero-section";
import { CategoryGrid } from "@/components/category-grid";
import { ProductGrid } from "@/components/product-grid";
import { PromoBanner } from "@/components/promo-banner";
import { getFeaturedProducts, getDeals } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const dealProducts = getDeals();

  return (
    <StoreLayout>
      <HeroSection />
      <div className="container mx-auto px-4">
        <CategoryGrid />
        <ProductGrid
          products={featuredProducts}
          title="Featured Products"
          description="Discover our handpicked selection of trending products that customers love"
        />
        <PromoBanner />
        <ProductGrid
          products={dealProducts}
          title="Hot Deals"
          description="Don't miss out on these amazing discounts - limited time only!"
        />
      </div>
    </StoreLayout>
  );
}
