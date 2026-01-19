"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreLayout } from "@/components/store-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/lib/cart-store";
import { useOrderStore, type Order } from "@/lib/order-store";
import { 
  CreditCard, 
  Truck, 
  Shield, 
  ArrowLeft,
  Lock,
  CheckCircle2,
  Package
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    shippingMethod: "standard" as "standard" | "express",
  });

  const totalPrice = getTotalPrice();
  const baseShipping = totalPrice > 100 ? 0 : 9.99;
  const shipping = formData.shippingMethod === "express" ? 19.99 : baseShipping;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Create the order
    const newOrder = addOrder({
      items: [...items],
      status: "pending",
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        address: formData.address,
        address2: formData.address2 || undefined,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
      },
      shippingMethod: formData.shippingMethod,
      subtotal: totalPrice,
      shipping,
      tax,
      total: finalTotal,
    });
    
    setCompletedOrder(newOrder);
    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  if (items.length === 0 && !isComplete) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Add some products to your cart before checking out.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </StoreLayout>
    );
  }

  if (isComplete && completedOrder) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="text-sm font-medium text-foreground mb-1">
              Order #{completedOrder.orderNumber}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              We'll send you an email confirmation shortly.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={`/orders/${completedOrder.id}`}>
                  <Package className="mr-2 h-4 w-4" />
                  Track Order
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/orders">View All Orders</Link>
              </Button>
              <Button variant="ghost" asChild className="w-full">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    1
                  </span>
                  Contact Information
                </h2>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required className="mt-1.5" value={formData.firstName} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required className="mt-1.5" value={formData.lastName} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required className="mt-1.5" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1.5" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    2
                  </span>
                  Shipping Address
                </h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" required className="mt-1.5" value={formData.address} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                    <Input id="address2" placeholder="Apt 4B" className="mt-1.5" value={formData.address2} onChange={handleInputChange} />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" required className="mt-1.5" value={formData.city} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="NY" required className="mt-1.5" value={formData.state} onChange={handleInputChange} />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" required className="mt-1.5" value={formData.zip} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Shipping Method */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    3
                  </span>
                  Shipping Method
                </h2>
                <RadioGroup 
                  value={formData.shippingMethod} 
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, shippingMethod: value as "standard" | "express" }))}
                >
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="font-medium cursor-pointer">
                          Standard Shipping
                        </Label>
                        <p className="text-sm text-muted-foreground">5-7 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">{baseShipping === 0 ? "Free" : `$${baseShipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="font-medium cursor-pointer">
                          Express Shipping
                        </Label>
                        <p className="text-sm text-muted-foreground">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium">$19.99</span>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Payment */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                    4
                  </span>
                  Payment
                </h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative mt-1.5">
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required className="mt-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="save" />
                <Label htmlFor="save" className="text-sm text-muted-foreground cursor-pointer">
                  Save my information for faster checkout next time
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Pay ${finalTotal.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:pl-8">
            <div className="sticky top-24 rounded-lg border border-border/50 bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.product.category}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Secure Payment</p>
                  </div>
                  <div className="text-center">
                    <Truck className="h-6 w-6 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Fast Delivery</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Quality Guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
