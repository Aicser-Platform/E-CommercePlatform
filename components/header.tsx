"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingCart, Menu, X, Search, User, Package, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Deals", href: "/deals" },
  { name: "Categories", href: "/categories" },
  { name: "Orders", href: "/orders" },
];

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const openCart = useCartStore((state) => state.openCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  // Update search query when URL params change
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Real-time search handler with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      } else if (searchParams.get("search")) {
        router.push("/products");
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, router, searchParams]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-15 w-15 items-center justify-center rounded-lg">
              {/* <span className="text-lg font-bold text-primary-foreground">S</span> */}
            <img src="/Aicser_Store_Logo.png" className="" alt="Aicser Store Logo" />
            </div>
            <span className="text-xl font-bold text-primary">AicserStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-muted/50 border-transparent focus:border-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Back to AICSER */}
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex items-center gap-1.5 bg-transparent text-muted-foreground hover:text-white hover:border-primary" 
              asChild
            >
              <a href="https://aicser.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>aicser.com</span>
              </a>
            </Button>
            {/* Orders */}
            <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="Orders" asChild>
              <Link href="/orders">
                <Package className="h-5 w-5" />
              </Link>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" className="hidden sm:flex" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <SheetClose asChild key={item.name}>
                        <Link
                          href={item.href}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="border-t pt-4 space-y-3">
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/orders">
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </Button>
                    </SheetClose>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-muted/50"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
