import { useState, useEffect } from "react";
import { getUserOrders, createOrder } from "@/lib/firebase";
import type { OrderType, CreateOrderRequestType } from "@shared/schema";
import { useAuth } from "./use-auth";

export const useUserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<(OrderType & { id: string })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const userOrders = await getUserOrders(user.uid);
      setOrders(userOrders);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return { orders, loading, error, refetch: fetchOrders };
};

export const useCreateOrder = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (orderData: CreateOrderRequestType & { packageName: string; amount: number }) => {
    if (!user) {
      throw new Error("User must be authenticated");
    }

    setLoading(true);
    setError(null);

    try {
      const order = await createOrder(user.uid, orderData);
      return order;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create order";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitOrder, loading, error };
};
