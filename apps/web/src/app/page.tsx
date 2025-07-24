import { type Trade, calculateFee, formatCurrency } from "@crypto-exchange/shared";
import { ApiStats } from "./components/ApiStats";
import { TradeCard } from "./components/TradeCard";

const mockTrades: Trade[] = [
  {
    id: "trade-1",
    userId: "user-1",
    pair: "BTC/USD",
    amount: 0.5,
    price: 45000,
    timestamp: new Date(),
    type: "buy",
  },
  {
    id: "trade-2",
    userId: "user-1",
    pair: "ETH/USD",
    amount: 2.0,
    price: 3000,
    timestamp: new Date(),
    type: "sell",
  },
  {
    id: "trade-3",
    userId: "user-2",
    pair: "BTC/USD",
    amount: 0.25,
    price: 44800,
    timestamp: new Date(),
    type: "buy",
  },
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
