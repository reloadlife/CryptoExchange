export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface Trade {
  id: string;
  userId: string;
  pair: string;
  amount: number;
  price: number;
  timestamp: Date;
  type: "buy" | "sell";
}

export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const calculateFee = (amount: number, feeRate = 0.001): number => {
  return amount * feeRate;
};
