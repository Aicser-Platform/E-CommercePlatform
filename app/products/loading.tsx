import { StoreLayout } from "@/components/store-layout";
import { ProductsPageSkeleton } from "@/components/product-skeleton";

export default function Loading() {
  return (
    <StoreLayout>
      <ProductsPageSkeleton />
    </StoreLayout>
  );
}
