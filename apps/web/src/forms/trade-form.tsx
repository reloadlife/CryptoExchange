"use client";

import { BaseForm } from "./base-form";
import { FormField } from "./form-field";
import { tradeSchema, type TradeFormData } from "./form-validation";

interface TradeFormProps {
  onSubmit: (data: TradeFormData) => void | Promise<void>;
  isLoading?: boolean;
}

const tradingPairs = [
  { value: "BTC/USD", label: "BTC/USD" },
  { value: "ETH/USD", label: "ETH/USD" },
  { value: "ADA/USD", label: "ADA/USD" },
  { value: "SOL/USD", label: "SOL/USD" },
];

const tradeTypes = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

export function TradeForm({ onSubmit, isLoading }: TradeFormProps) {
  const defaultValues: Partial<TradeFormData> = {
    type: "buy",
    amount: 0,
    price: 0,
  };

  return (
    <BaseForm
      schema={tradeSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      title="Create Trade"
      description="Place a new buy or sell order"
      submitText="Place Trade"
      isLoading={isLoading}
    >
      <FormField
        name="pair"
        label="Trading Pair"
        type="select"
        options={tradingPairs}
        required
      />
      <FormField
        name="type"
        label="Trade Type"
        type="select"
        options={tradeTypes}
        required
      />
      <FormField
        name="amount"
        label="Amount"
        type="number"
        placeholder="0.00"
        required
      />
      <FormField
        name="price"
        label="Price"
        type="number"
        placeholder="0.00"
        required
      />
    </BaseForm>
  );
}
