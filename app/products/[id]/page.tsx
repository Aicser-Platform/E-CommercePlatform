"use client";

import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getProductById,
  getAllRelatedProducts,
  type Product,
} from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { StoreLayout } from "@/components/store-layout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ProductImages({ product }: { product: Product }) {
  const images = product.images || [product.image];
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        {product.badge && (
          <Badge
            className={cn(
              "absolute left-4 top-4 text-sm",
              product.badge === "sale" && "bg-red-500 hover:bg-red-600",
              product.badge === "new" && "bg-primary hover:bg-primary/90",
              product.badge === "bestseller" && "bg-amber-500 hover:bg-amber-600"
            )}
          >
            {product.badge === "sale" && "Sale"}
            {product.badge === "new" && "New"}
            {product.badge === "bestseller" && "Bestseller"}
          </Badge>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all",
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-muted-foreground/30"
              )}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: { name: string; hex: string }[];
  selected: string;
  onSelect: (color: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Color</span>
        <span className="text-sm text-muted-foreground">{selected}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onSelect(color.name)}
            className={cn(
              "relative h-10 w-10 rounded-full border-2 transition-all",
              selected === color.name
                ? "border-primary ring-2 ring-primary/20"
                : "border-muted hover:border-muted-foreground/50"
            )}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {selected === color.name && (
              <Check
                className={cn(
                  "absolute inset-0 m-auto h-5 w-5",
                  color.hex === "#ffffff" || color.hex === "#f5f5f5" || color.hex === "#f8f8f8"
                    ? "text-foreground"
                    : "text-white"
                )}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Size</span>
        <button className="text-sm text-primary hover:underline">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={cn(
              "min-w-[3rem] rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all",
              selected === size
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted bg-background text-foreground hover:border-muted-foreground/50"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-foreground">Quantity</span>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-input">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-r-none"
            onClick={onDecrease}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-l-none"
            onClick={onIncrease}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductFeatures({ features }: { features: string[] }) {
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium text-foreground">Features</span>
      <ul className="grid gap-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-2xl font-bold text-foreground">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);

  if (!product) {
    notFound();
  }

  const relatedProducts = getAllRelatedProducts(product, 4);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize || undefined, selectedColor || undefined);
    }
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <StoreLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link
            href="/products"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="text-muted-foreground hover:text-foreground"
          >
            {product.category}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Images */}
          <ProductImages product={product} />

          {/* Info */}
          <div className="flex flex-col gap-6">
            {/* Title & Rating */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                {product.badge && (
                  <Badge
                    className={cn(
                      "text-xs",
                      product.badge === "sale" && "bg-red-500",
                      product.badge === "new" && "bg-primary",
                      product.badge === "bestseller" && "bg-amber-500"
                    )}
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium text-foreground">
                  {product.rating}
                </span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    Save {discount}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.longDescription || product.description}
            </p>

            <Separator />

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <ColorSelector
                colors={product.colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            )}

            {/* Quantity */}
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "gap-2",
                  isWishlisted && "border-red-300 bg-red-50 text-red-600"
                )}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={cn("h-5 w-5", isWishlisted && "fill-current")}
                />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Separator />

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <ProductFeatures features={product.features} />
            )}

            {/* Shipping & Returns */}
            <div className="grid gap-4 rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">
                    30-day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Secure Checkout</p>
                  <p className="text-sm text-muted-foreground">
                    SSL encrypted payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </StoreLayout>
  );
}
