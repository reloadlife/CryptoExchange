import type { TradeWithCalculations } from "@crypto-exchange/sdk";

interface TradeCardProps {
  trade: TradeWithCalculations;
}

export function TradeCard({ trade }: TradeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{trade.pair}</h3>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            trade.type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {trade.type.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">{trade.amount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-medium">{trade.formattedPrice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Total Value:</span>
          <span className="font-medium">{trade.totalValue}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Fee:</span>
          <span className="font-medium">{trade.fee}</span>
        </div>

        <div className="pt-3 border-t">
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="text-sm text-gray-500">{trade.timestamp.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
