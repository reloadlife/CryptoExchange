"use client";

import { useState, useEffect } from "react";
import { TradeCard } from "../components/TradeCard";
import type { Trade } from "@crypto-exchange/shared";

interface TradeResponse {
  trades: (Trade & {
    totalValue: string;
    fee: string;
    formattedPrice: string;
  })[];
  count: number;
}

// Generate stable IDs for skeleton loading
const generateSkeletonItems = (count: number) =>
  Array.from({ length: count }, () => crypto.randomUUID());

const generateSkeletonLines = (count: number) =>
  Array.from({ length: count }, () => crypto.randomUUID());

export default function TradesPage() {
  const [trades, setTrades] = useState<TradeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/trades");
        if (response.ok) {
          const data = await response.json();
          setTrades(data);
          setError(null);
        } else {
          setError("Failed to fetch trades");
        }
      } catch (err) {
        setError("Failed to connect to API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrades();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">All Trades</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {generateSkeletonItems(6).map((id) => (
            <div key={id} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
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
          <h3 className="text-red-800 font-medium mb-2">Error Loading Trades</h3>
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
        <h1 className="text-3xl font-bold text-gray-900">All Trades</h1>
        <div className="text-sm text-gray-600">
          {trades?.count} {trades?.count === 1 ? "trade" : "trades"} found
        </div>
      </div>

      {trades?.trades && trades.trades.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trades.trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trades found</h3>
          <p className="text-gray-600">Start trading to see your transactions here.</p>
        </div>
      )}
    </div>
  );
}
