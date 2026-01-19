"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart-store";

export type OrderStatus = 
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: Date;
  description: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  status: OrderStatus;
  statusHistory: OrderStatusHistory[];
  shippingAddress: ShippingAddress;
  shippingMethod: "standard" | "express";
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: Date;
  estimatedDelivery: Date;
  trackingNumber?: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "orderNumber" | "statusHistory" | "createdAt" | "estimatedDelivery">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, description: string) => void;
  getOrder: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

function generateOrderNumber(): string {
  const prefix = "SHP";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

function generateOrderId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function getEstimatedDelivery(shippingMethod: "standard" | "express"): Date {
  const now = new Date();
  const days = shippingMethod === "express" ? 3 : 7;
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}

function getStatusDescription(status: OrderStatus): string {
  const descriptions: Record<OrderStatus, string> = {
    pending: "Order has been placed and is awaiting confirmation",
    confirmed: "Order has been confirmed and payment received",
    processing: "Order is being prepared for shipment",
    shipped: "Order has been shipped and is on its way",
    out_for_delivery: "Order is out for delivery",
    delivered: "Order has been delivered successfully",
    cancelled: "Order has been cancelled",
  };
  return descriptions[status];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const now = new Date();
        const newOrder: Order = {
          ...orderData,
          id: generateOrderId(),
          orderNumber: generateOrderNumber(),
          createdAt: now,
          estimatedDelivery: getEstimatedDelivery(orderData.shippingMethod),
          statusHistory: [
            {
              status: orderData.status,
              timestamp: now,
              description: getStatusDescription(orderData.status),
            },
          ],
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        // Simulate order status updates for demo purposes
        setTimeout(() => {
          get().updateOrderStatus(newOrder.id, "confirmed", "Payment confirmed. Your order is being processed.");
        }, 3000);

        setTimeout(() => {
          get().updateOrderStatus(newOrder.id, "processing", "Your order is being prepared for shipment.");
        }, 8000);

        return newOrder;
      },

      updateOrderStatus: (orderId, status, description) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                  statusHistory: [
                    ...order.statusHistory,
                    {
                      status,
                      timestamp: new Date(),
                      description,
                    },
                  ],
                }
              : order
          ),
        }));
      },

      getOrder: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getOrderByNumber: (orderNumber) => {
        return get().orders.find((order) => order.orderNumber === orderNumber);
      },
    }),
    {
      name: "shopease-orders",
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);

export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-cyan-100 text-cyan-800",
    out_for_delivery: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status];
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    processing: "Processing",
    shipped: "Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status];
}

export function getStatusStep(status: OrderStatus): number {
  const steps: Record<OrderStatus, number> = {
    pending: 0,
    confirmed: 1,
    processing: 2,
    shipped: 3,
    out_for_delivery: 4,
    delivered: 5,
    cancelled: -1,
  };
  return steps[status];
}
