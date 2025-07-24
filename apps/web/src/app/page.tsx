import { calculateFee, formatCurrency } from "@crypto-exchange/shared";
import type { TradeWithCalculations } from "@crypto-exchange/api";
import { ApiStats } from "./components/ApiStats";
import { TradeCard } from "./components/TradeCard";

const createMockTradeWithCalculations = (
  id: string,
  userId: string,
  pair: string,
  amount: number,
  price: number,
  type: "buy" | "sell"
): TradeWithCalculations => {
  const totalValue = amount * price;
  const fee = calculateFee(totalValue);
  
  return {
    id,
    userId,
    pair,
    amount,
    price,
    timestamp: new Date(),
    type,
    totalValue: formatCurrency(totalValue),
    fee: formatCurrency(fee),
    formattedPrice: formatCurrency(price),
  };
};

const mockTrades: TradeWithCalculations[] = [
  createMockTradeWithCalculations("trade-1", "user-1", "BTC/USD", 0.5, 45000, "buy"),
  createMockTradeWithCalculations("trade-2", "user-1", "ETH/USD", 2.0, 3000, "sell"),
  createMockTradeWithCalculations("trade-3", "user-2", "BTC/USD", 0.25, 44800, "buy"),
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Crypto Exchange</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern, fast, and secure platform for cryptocurrency trading built with Next.js and
          Hono.
        </p>
      </div>

      {/* API Stats */}
      <ApiStats />

      {/* Recent Trades */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Trades</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTrades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">⚡ Lightning Fast</h3>
            <p className="text-gray-600">Built with Next.js and Hono for optimal performance</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">🔒 Secure</h3>
            <p className="text-gray-600">Enterprise-grade security for your assets</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">📱 Responsive</h3>
            <p className="text-gray-600">Trade seamlessly on any device</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">💰 Low Fees</h3>
            <p className="text-gray-600">Competitive trading fees starting at 0.1%</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">🔄 Real-time</h3>
            <p className="text-gray-600">Live market data and instant execution</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">🌐 Global</h3>
            <p className="text-gray-600">Access markets worldwide 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
