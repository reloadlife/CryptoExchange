import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"

const app = new Hono()

// CORS middleware
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
)

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() })
})

// API routes
app.get("/api/v1/hello", (c) => {
  return c.json({ message: "Hello from Crypto Exchange API!" })
})

// User routes placeholder
app.get("/api/v1/users", (c) => {
  return c.json({ users: [] })
})

// Trade routes placeholder
app.get("/api/v1/trades", (c) => {
  return c.json({ trades: [] })
})

const port = process.env.PORT || 3001

console.log(`🚀 Server running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port: Number(port),
})
