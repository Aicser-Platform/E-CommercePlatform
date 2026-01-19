"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-muted block">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge && (
          <Badge
            className={cn(
              "absolute top-3 left-3 font-medium",
              product.badge === "sale" &&
                "bg-destructive text-destructive-foreground",
              product.badge === "new" && "bg-primary text-primary-foreground",
              product.badge === "bestseller" &&
                "bg-accent text-accent-foreground"
            )}
          >
            {product.badge === "sale" && `-${discount}%`}
            {product.badge === "new" && "New"}
            {product.badge === "bestseller" && "Bestseller"}
          </Badge>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        <Button
          size="icon"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary hover:bg-primary/90 text-primary-foreground z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </Link>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-1 mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            className="hidden sm:flex bg-transparent"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
