import { StoreLayout } from "@/components/store-layout";
import { ProductDetailSkeleton } from "@/components/product-skeleton";

export default function Loading() {
  return (
    <StoreLayout>
      <ProductDetailSkeleton />
    </StoreLayout>
  );
}
