import { StoreLayout } from "@/components/store-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/product-skeleton";

export default function Loading() {
  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-48 mx-auto mb-2" />
          <Skeleton className="h-5 w-72 mx-auto" />
        </div>

        {/* Banner */}
        <Skeleton className="h-32 w-full rounded-xl mb-10" />

        {/* Products */}
        <ProductGridSkeleton count={6} className="xl:grid-cols-4" />
      </div>
    </StoreLayout>
  );
}
