import type { Trade } from "@crypto-exchange/shared";
import type { TradeService } from "../types/index.js";

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

export class TradeServiceImpl implements TradeService {
  async getAllTrades(): Promise<Trade[]> {
    return [...mockTrades];
  }

  async getTradeById(id: string): Promise<Trade | null> {
    const trade = mockTrades.find((t) => t.id === id);
    return trade || null;
  }

  async createTrade(
    tradeData: Omit<Trade, "id" | "timestamp">
  ): Promise<Trade> {
    const newTrade: Trade = {
      ...tradeData,
      id: `trade-${Date.now()}`,
      timestamp: new Date(),
    };

    mockTrades.push(newTrade);
    return newTrade;
  }
}

export const tradeService = new TradeServiceImpl();
