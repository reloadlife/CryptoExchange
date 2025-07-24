"use client";

import { TradeForm as BaseTradeForm } from "@/forms/trade-form";
import { useApi } from "@/hooks/use-api";
import { useApp } from "@/contexts/app-context";
import { type TradeFormData } from "@/forms/form-validation";

export function TradeForm() {
  const { useCreateTrade } = useApi();
  const { addNotification } = useApp();
  const createTrade = useCreateTrade();

  const handleSubmit = async (data: TradeFormData) => {
    try {
      await createTrade.mutateAsync(data);
      addNotification({
        type: "success",
        message: `${data.type.toUpperCase()} order for ${data.amount} ${
          data.pair
        } placed successfully!`,
      });
    } catch (error: any) {
      addNotification({
        type: "error",
        message: error?.message || "Failed to place trade",
      });
    }
  };

  return (
    <BaseTradeForm onSubmit={handleSubmit} isLoading={createTrade.isPending} />
  );
}
