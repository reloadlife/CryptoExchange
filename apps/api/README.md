# Crypto Exchange API

A fast and lightweight API backend built with Hono and Bun.

## Features

- Ultra-fast HTTP server with Hono
- Bun runtime for superior performance
- CORS enabled for frontend integration
- TypeScript for type safety
- Shared types from workspace packages

## Development

Start the development server with hot reload:

```bash
pnpm dev
```

The API will be available at [http://localhost:3001](http://localhost:3001).

## Build

Build for production:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## API Endpoints

### General

- `GET /` - API status and version
- `GET /api/health` - Health check endpoint

### Trades

- `GET /api/trades` - List all trades with fees calculated
- `GET /api/trades/:id` - Get specific trade by ID
- `POST /api/trades` - Create new trade

### Example Response

```json
{
  "trades": [
    {
      "id": "trade-1",
      "userId": "user-1",
      "pair": "BTC/USD",
      "amount": 0.5,
      "price": 45000,
      "type": "buy",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "totalValue": "$22,500.00",
      "fee": "$22.50",
      "formattedPrice": "$45,000.00"
    }
  ],
  "count": 1
}
```

## Project Structure

```
apps/api/
├── src/
│   └── index.ts          # Main server file
├── bunfig.toml           # Bun configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Dependencies

- **Hono**: Fast web framework for Bun/Node.js
- **Bun**: JavaScript runtime and toolkit
- **@crypto-exchange/shared**: Shared workspace utilities
- **TypeScript**: Type safety
