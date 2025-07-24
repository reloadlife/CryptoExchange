"use client";

import { useState } from "react";
import { apiClient, type ApiError } from "../../lib/api";
import type { CreateTradeRequest } from "@crypto-exchange/api";

interface TradeFormData {
  pair: string;
  amount: string;
  price: string;
  type: "buy" | "sell";
}

export function TradeForm() {
  const [formData, setFormData] = useState<TradeFormData>({
    pair: "BTC/USD",
    amount: "",
    price: "",
    type: "buy",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const tradeRequest: CreateTradeRequest = {
        ...formData,
        amount: parseFloat(formData.amount),
        price: parseFloat(formData.price),
      };

      const response = await apiClient.createTrade(tradeRequest);

      if (response.success && response.data) {
        setMessage({
          type: "success",
          text: `Trade created successfully! ID: ${response.data.id}`,
        });
        setFormData({
          pair: "BTC/USD",
          amount: "",
          price: "",
          type: "buy",
        });
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error) {
      const apiError = error as ApiError;
      setMessage({
        type: "error",
        text: apiError.message || "Failed to create trade",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Trade</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="pair"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Trading Pair
          </label>
          <select
            id="pair"
            name="pair"
            value={formData.pair}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BTC/USD">BTC/USD</option>
            <option value="ETH/USD">ETH/USD</option>
            <option value="BTC/ETH">BTC/ETH</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            step="0.000001"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.0"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Trade Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          } text-white transition-colors`}
        >
          {isSubmitting ? "Creating Trade..." : "Create Trade"}
        </button>
      </form>
    </div>
  );
}
