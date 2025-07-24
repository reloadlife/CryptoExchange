import { Hono } from "hono";
import {
  createTrade,
  getAllTrades,
  getTradeById,
} from "../controllers/tradeController.js";

const trades = new Hono();

trades.get("/", getAllTrades);
trades.get("/:id", getTradeById);
trades.post("/", createTrade);

export { trades };
