"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { categories } from "@/lib/products";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  className?: string;
}

export function ProductFilters({ className }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/products");
    setPriceRange([0, 500]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categories</h3>
        <RadioGroup value={currentCategory} onValueChange={handleCategoryChange}>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={category} />
              <Label
                htmlFor={category}
                className="text-sm cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
              >
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            step={10}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sort By */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Sort By</h3>
        <RadioGroup defaultValue="featured">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="featured" id="featured" />
            <Label htmlFor="featured" className="text-sm cursor-pointer text-muted-foreground">
              Featured
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-low" id="price-low" />
            <Label htmlFor="price-low" className="text-sm cursor-pointer text-muted-foreground">
              Price: Low to High
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-high" id="price-high" />
            <Label htmlFor="price-high" className="text-sm cursor-pointer text-muted-foreground">
              Price: High to Low
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rating" id="rating" />
            <Label htmlFor="rating" className="text-sm cursor-pointer text-muted-foreground">
              Highest Rated
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={clearFilters}
      >
        <X className="mr-2 h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <aside className={cn("hidden lg:block", className)}>
        <div className="sticky top-24 rounded-lg border border-border/50 bg-card p-6">
          <h2 className="font-bold text-lg text-foreground mb-4">Filters</h2>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden bg-transparent">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
