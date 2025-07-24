"use client";

import { useState, useEffect } from "react";
import { TradeCard } from "../components/TradeCard";
import { TradeForm } from "../components/TradeForm";
import { apiClient, type ApiError } from "../../lib/api";
import type { GetTradesResponse } from "@crypto-exchange/sdk";

const generateSkeletonItems = (count: number) =>
  Array.from({ length: count }, () => crypto.randomUUID());

const generateSkeletonLines = (count: number) =>
  Array.from({ length: count }, () => crypto.randomUUID());

export default function TradesPage() {
  const [tradesData, setTradesData] = useState<
    GetTradesResponse["data"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrades = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getTrades();
      if (response.success && response.data) {
        setTradesData(response.data);
        setError(null);
      } else {
        setError("Failed to fetch trades");
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to connect to API");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">All Trades</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {generateSkeletonItems(6).map((id) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-sm border p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="space-y-3">
                {generateSkeletonLines(4).map((lineId) => (
                  <div key={lineId} className="h-4 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">All Trades</h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-6">
          <h3 className="text-red-800 font-medium mb-2">
            Error Loading Trades
          </h3>
          <p className="text-red-600">{error}</p>
          <p className="text-red-600 text-sm mt-2">
            Make sure the API server is running on port 3001.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Trading Dashboard</h1>
        <button
          onClick={fetchTrades}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TradeForm />
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Trades
            </h2>
            <div className="text-sm text-gray-600">
              {tradesData?.count} {tradesData?.count === 1 ? "trade" : "trades"}{" "}
              found
            </div>
          </div>

          {tradesData?.trades && tradesData.trades.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {tradesData.trades.map((trade) => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No trades found
              </h3>
              <p className="text-gray-600">
                Create your first trade using the form.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
