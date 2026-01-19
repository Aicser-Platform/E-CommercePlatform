import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductSkeletonProps {
  className?: string;
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden border-border/50", className)}>
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full rounded-none" />
      
      {/* Content skeleton */}
      <CardContent className="p-4">
        {/* Category */}
        <Skeleton className="h-3 w-16 mb-2" />
        
        {/* Title */}
        <Skeleton className="h-5 w-3/4 mb-1" />
        
        {/* Description */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-3.5 w-3.5 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-3 w-8 ml-1" />
        </div>
        
        {/* Price and button */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24 hidden sm:block" />
        </div>
      </CardContent>
    </Card>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({ count = 6, className }: ProductGridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-5 w-36" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Skeleton - Desktop */}
        <div className="w-64 flex-shrink-0 hidden lg:block space-y-6">
          {/* Categories */}
          <div>
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <Skeleton className="h-5 w-28 mb-3" />
            <Skeleton className="h-2 w-full mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 flex-1" />
            </div>
          </div>
          
          {/* Sort By */}
          <div>
            <Skeleton className="h-5 w-20 mb-3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          <ProductGridSkeleton count={6} />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Skeleton className="h-10 w-32 mb-8" />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badge */}
          <Skeleton className="h-6 w-16" />
          
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          
          {/* Price */}
          <Skeleton className="h-10 w-32" />
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          {/* Color selector */}
          <div>
            <Skeleton className="h-5 w-16 mb-3" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>
          
          {/* Size selector */}
          <div>
            <Skeleton className="h-5 w-12 mb-3" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-14 rounded-md" />
              ))}
            </div>
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
