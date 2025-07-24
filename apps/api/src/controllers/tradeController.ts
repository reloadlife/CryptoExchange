import { calculateFee, formatCurrency } from "@crypto-exchange/shared";
import type { Context } from "hono";
import type { ApiSuccessResponse } from "../types/index.js";
import { tradeService } from "../services/tradeService.js";

interface TradeWithCalculations {
  id: string;
  userId: string;
  pair: string;
  amount: number;
  price: number;
  timestamp: Date;
  type: "buy" | "sell";
  totalValue: string;
  fee: string;
  formattedPrice: string;
}

const addCalculationsToTrade = (trade: any): TradeWithCalculations => {
  const totalValue = trade.amount * trade.price;
  const fee = calculateFee(totalValue);

  return {
    ...trade,
    totalValue: formatCurrency(totalValue),
    fee: formatCurrency(fee),
    formattedPrice: formatCurrency(trade.price),
  };
};

export const getAllTrades = async (c: Context) => {
  try {
    const trades = await tradeService.getAllTrades();
    const tradesWithCalculations = trades.map(addCalculationsToTrade);

    const response: ApiSuccessResponse<{
      trades: TradeWithCalculations[];
      count: number;
    }> = {
      success: true,
      data: {
        trades: tradesWithCalculations,
        count: tradesWithCalculations.length,
      },
    };

    return c.json(response);
  } catch (error) {
    throw error;
  }
};

export const getTradeById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const trade = await tradeService.getTradeById(id);

    if (!trade) {
      return c.json(
        {
          success: false,
          error: "Trade not found",
          message: `Trade with id ${id} does not exist`,
        },
        404
      );
    }

    const tradeWithCalculations = addCalculationsToTrade(trade);

    const response: ApiSuccessResponse<TradeWithCalculations> = {
      success: true,
      data: tradeWithCalculations,
    };

    return c.json(response);
  } catch (error) {
    throw error;
  }
};

export const createTrade = async (c: Context) => {
  try {
    const body = await c.req.json();

    if (!body.pair || !body.amount || !body.price || !body.type) {
      return c.json(
        {
          success: false,
          error: "Missing required fields",
          message: "pair, amount, price, and type are required",
        },
        400
      );
    }

    const tradeData = {
      userId: body.userId || "user-1",
      pair: body.pair,
      amount: Number(body.amount),
      price: Number(body.price),
      type: body.type,
    };

    if (isNaN(tradeData.amount) || isNaN(tradeData.price)) {
      return c.json(
        {
          success: false,
          error: "Invalid input",
          message: "amount and price must be valid numbers",
        },
        400
      );
    }

    if (!["buy", "sell"].includes(tradeData.type)) {
      return c.json(
        {
          success: false,
          error: "Invalid trade type",
          message: "type must be either 'buy' or 'sell'",
        },
        400
      );
    }

    const newTrade = await tradeService.createTrade(tradeData);
    const tradeWithCalculations = addCalculationsToTrade(newTrade);

    const response: ApiSuccessResponse<TradeWithCalculations> = {
      success: true,
      data: tradeWithCalculations,
      message: "Trade created successfully",
    };

    return c.json(response, 201);
  } catch (error) {
    throw error;
  }
};
