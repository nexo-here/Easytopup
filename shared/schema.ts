import { z } from "zod";

export const TopupCategory = z.object({
  id: z.string(),
  name: z.string(),
  nameEn: z.string(),
  description: z.string(),
  icon: z.string(),
  bgGradient: z.string(),
  textColor: z.string(),
  route: z.string(),
});

export const TopupPackage = z.object({
  id: z.string(),
  categoryId: z.string(),
  name: z.string(),
  nameEn: z.string(),
  diamonds: z.number().optional(),
  price: z.number(),
  originalPrice: z.number().optional(),
  badge: z.string().optional(),
  badgeColor: z.string().optional(),
  description: z.string().optional(),
  validity: z.string().optional(),
});

export const DiamondPackage = z.object({
  id: z.string(),
  name: z.string(),
  diamonds: z.number(),
  price: z.number(),
  originalPrice: z.number().optional(),
  badge: z.string().optional(),
  badgeColor: z.string().optional(),
});

export const User = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  photoURL: z.string().optional(),
  createdAt: z.date(),
});

export const Order = z.object({
  id: z.string(),
  userId: z.string(),
  playerId: z.string(),
  playerName: z.string().optional(),
  packageId: z.string(),
  packageName: z.string(),
  amount: z.number(),
  transactionId: z.string(),
  status: z.enum(["pending", "completed", "failed"]),
  createdAt: z.date(),
});

export const CreateOrderRequest = z.object({
  playerId: z.string().min(8, "Player ID must be at least 8 characters"),
  playerName: z.string().optional(),
  packageId: z.string(),
  transactionId: z.string().min(10, "Transaction ID must be at least 10 characters"),
});

export type TopupCategoryType = z.infer<typeof TopupCategory>;
export type TopupPackageType = z.infer<typeof TopupPackage>;
export type DiamondPackageType = z.infer<typeof DiamondPackage>;
export type UserType = z.infer<typeof User>;
export type OrderType = z.infer<typeof Order>;
export type CreateOrderRequestType = z.infer<typeof CreateOrderRequest>;
