import { z } from "zod";

export const tradeSchema = z.object({
  pair: z.string().min(1, "Trading pair is required"),
  amount: z.number().positive("Amount must be positive"),
  price: z.number().positive("Price must be positive"),
  type: z.enum(["buy", "sell"], {
    required_error: "Trade type is required",
  }),
});

export const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type TradeFormData = z.infer<typeof tradeSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
