"use client";

import React from "react"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { StoreLayout } from "@/components/store-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useOrderStore,
  getStatusColor,
  getStatusLabel,
  getStatusStep,
  type Order,
  type OrderStatus,
} from "@/lib/order-store";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Copy,
  ExternalLink,
  PackageCheck,
  PackageOpen,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ORDER_STEPS: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: "pending", label: "Order Placed", icon: PackageOpen },
  { status: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { status: "processing", label: "Processing", icon: Package },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
  { status: "delivered", label: "Delivered", icon: PackageCheck },
];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrder, orders } = useOrderStore();
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && params.id) {
      const foundOrder = getOrder(params.id as string);
      setOrder(foundOrder);
    }
  }, [mounted, params.id, getOrder, orders]);

  const copyOrderNumber = () => {
    if (order) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!mounted) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-64 w-full bg-muted rounded" />
          </div>
        </div>
      </StoreLayout>
    );
  }

  if (!order) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Order Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the order you're looking for.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </StoreLayout>
    );
  }

  const currentStep = getStatusStep(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>

          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Order {order.orderNumber}
                </h1>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={copyOrderNumber}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-muted-foreground">
                Placed on {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
              </p>
            </div>
            <Badge className={cn("text-sm px-3 py-1", getStatusColor(order.status))}>
              {getStatusLabel(order.status)}
            </Badge>
          </div>

          {/* Order Progress */}
          {!isCancelled && (
            <Card className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Progress Steps */}
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted">
                    <div
                      className="absolute h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (currentStep / (ORDER_STEPS.length - 1)) * 100)}%`,
                      }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="relative flex justify-between">
                    {ORDER_STEPS.map((step, index) => {
                      const isCompleted = index <= currentStep;
                      const isCurrent = index === currentStep;
                      const Icon = step.icon;

                      return (
                        <div
                          key={step.status}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center transition-colors z-10",
                              isCompleted
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground",
                              isCurrent && "ring-4 ring-primary/20"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span
                            className={cn(
                              "text-xs mt-2 text-center max-w-[80px]",
                              isCompleted
                                ? "text-foreground font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Delivery
                      </p>
                      <p className="font-semibold text-foreground">
                        {formatDate(order.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="md:col-span-2 space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Order Items ({order.items.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={`${item.product.id}-${index}`}>
                      <div className="flex gap-4">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0"
                        >
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.product.id}`}>
                            <h4 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                              {item.product.name}
                            </h4>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category}
                          </p>
                          {(item.selectedSize || item.selectedColor) && (
                            <p className="text-sm text-muted-foreground">
                              {[item.selectedColor, item.selectedSize]
                                .filter(Boolean)
                                .join(" / ")}
                            </p>
                          )}
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      {index < order.items.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Status History */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Status History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.statusHistory
                      .slice()
                      .reverse()
                      .map((history, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={cn(
                                "w-3 h-3 rounded-full",
                                index === 0 ? "bg-primary" : "bg-muted"
                              )}
                            />
                            {index < order.statusHistory.length - 1 && (
                              <div className="w-0.5 h-full bg-muted flex-1 my-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  index === 0 && getStatusColor(history.status)
                                )}
                              >
                                {getStatusLabel(history.status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-foreground">
                              {history.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(history.timestamp)} at{" "}
                              {formatTime(history.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      ${order.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {order.shipping === 0
                        ? "Free"
                        : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">
                      ${order.tax.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p className="font-medium text-foreground">
                      {order.shippingAddress.firstName}{" "}
                      {order.shippingAddress.lastName}
                    </p>
                    <p className="text-muted-foreground">
                      {order.shippingAddress.address}
                    </p>
                    {order.shippingAddress.address2 && (
                      <p className="text-muted-foreground">
                        {order.shippingAddress.address2}
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zip}
                    </p>
                    <p className="text-muted-foreground">
                      {order.shippingAddress.email}
                    </p>
                    {order.shippingAddress.phone && (
                      <p className="text-muted-foreground">
                        {order.shippingAddress.phone}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground">
                    {order.shippingMethod === "express"
                      ? "Express Shipping"
                      : "Standard Shipping"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingMethod === "express"
                      ? "2-3 business days"
                      : "5-7 business days"}
                  </p>
                  {order.trackingNumber && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-sm text-muted-foreground mb-1">
                        Tracking Number
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {order.trackingNumber}
                        </code>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Need Help?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
