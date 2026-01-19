"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreLayout } from "@/components/store-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrderStore, getStatusColor, getStatusLabel } from "@/lib/order-store";
import {
  Package,
  Search,
  ChevronRight,
  ShoppingBag,
  Calendar,
  Truck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export default function OrdersPage() {
  const { orders } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-12 w-full bg-muted rounded" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 w-full bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </StoreLayout>
    );
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Order History</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage your orders
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-16">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {searchQuery ? "No orders found" : "No orders yet"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? "Try a different search term"
                      : "Start shopping to see your orders here"}
                  </p>
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className="border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div className="p-4 sm:p-6 border-b border-border/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">
                              {order.orderNumber}
                            </span>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Truck className="h-4 w-4" />
                            <span>Est. {formatDate(order.estimatedDelivery)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                          {order.items.slice(0, 4).map((item, index) => (
                            <div
                              key={`${item.product.id}-${index}`}
                              className="relative h-14 w-14 rounded-lg overflow-hidden border-2 border-background"
                            >
                              <Image
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 4 && (
                            <div className="h-14 w-14 rounded-lg border-2 border-background bg-muted flex items-center justify-center">
                              <span className="text-sm font-medium text-muted-foreground">
                                +{order.items.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length !== 1 && "s"}
                          </p>
                          <p className="font-semibold text-foreground">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <Button variant="outline" asChild className="bg-transparent">
                          <Link href={`/orders/${order.id}`}>
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Help Section */}
          <Separator className="my-8" />
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-2">
              Need help with an order?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our customer support team is here to assist you
            </p>
            <Button variant="outline" className="bg-transparent">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}


