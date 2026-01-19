"use client";

import { useSearchParams } from "next/navigation";
import { StoreLayout } from "@/components/store-layout";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { products, getProductsByCategory } from "@/lib/products";
import { Suspense } from "react";
import { ProductsPageSkeleton } from "@/components/product-skeleton";

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";
  const filteredProducts = getProductsByCategory(category);

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {category === "All" ? "All Products" : category}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <ProductFilters className="w-64 flex-shrink-0" />

          {/* Mobile Filter Button + Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <ProductFilters />
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <StoreLayout>
          <ProductsPageSkeleton />
        </StoreLayout>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
