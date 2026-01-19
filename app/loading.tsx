import { StoreLayout } from "@/components/store-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product-skeleton";

export default function Loading() {
  return (
    <StoreLayout>
      {/* Hero Skeleton */}
      <section className="relative bg-secondary/30 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-full max-w-md" />
              <Skeleton className="h-12 w-3/4 max-w-sm" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full max-w-lg" />
                <Skeleton className="h-5 w-2/3 max-w-md" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-12 w-36" />
                <Skeleton className="h-12 w-36" />
              </div>
              <div className="flex gap-8 pt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-8 w-16 mb-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>
            <Skeleton className="aspect-square rounded-2xl hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-5 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Skeleton */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-10 w-24 hidden sm:block" />
          </div>
          <ProductGridSkeleton count={4} className="xl:grid-cols-4" />
        </div>
      </section>

      {/* Promo Banner Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </section>

      {/* Hot Deals Skeleton */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-10 w-28 hidden sm:block" />
          </div>
          <ProductGridSkeleton count={4} className="xl:grid-cols-4" />
        </div>
      </section>
    </StoreLayout>
  );
}
