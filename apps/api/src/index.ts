import { type Trade, calculateFee, formatCurrency } from "@crypto-exchange/shared";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    message: "Crypto Exchange API",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/api/health", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/trades", (c) => {
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

  const tradesWithFees = mockTrades.map((trade) => {
    const totalValue = trade.amount * trade.price;
    const fee = calculateFee(totalValue);

    return {
      ...trade,
      totalValue: formatCurrency(totalValue),
      fee: formatCurrency(fee),
      formattedPrice: formatCurrency(trade.price),
    };
  });

  return c.json({
    trades: tradesWithFees,
    count: tradesWithFees.length,
  });
});

app.get("/api/trades/:id", (c) => {
  const id = c.req.param("id");

  const mockTrade: Trade = {
    id,
    userId: "user-1",
    pair: "BTC/USD",
    amount: 0.5,
    price: 45000,
    timestamp: new Date(),
    type: "buy",
  };

  const totalValue = mockTrade.amount * mockTrade.price;
  const fee = calculateFee(totalValue);

  return c.json({
    ...mockTrade,
    totalValue: formatCurrency(totalValue),
    fee: formatCurrency(fee),
    formattedPrice: formatCurrency(mockTrade.price),
  });
});

app.post("/api/trades", async (c) => {
  const body = await c.req.json();

  const newTrade: Trade = {
    id: `trade-${Date.now()}`,
    userId: body.userId || "user-1",
    pair: body.pair,
    amount: Number(body.amount),
    price: Number(body.price),
    timestamp: new Date(),
    type: body.type,
  };

  const totalValue = newTrade.amount * newTrade.price;
  const fee = calculateFee(totalValue);

  return c.json(
    {
      ...newTrade,
      totalValue: formatCurrency(totalValue),
      fee: formatCurrency(fee),
      formattedPrice: formatCurrency(newTrade.price),
    },
    201
  );
});

export default {
  port: 3001,
  fetch: app.fetch,
};
