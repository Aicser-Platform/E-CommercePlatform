"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

export function ProductGrid({ products, title, description }: ProductGridProps) {
  return (
    <section className="py-12">
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-pretty">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
