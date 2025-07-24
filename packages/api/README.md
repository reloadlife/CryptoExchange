# @crypto-exchange/api

A TypeScript SDK and type definitions for the Crypto Exchange API.

## Features

- **Type-safe API client** with TypeScript support
- **Comprehensive error handling** with proper error types
- **Request timeout and retry logic**
- **Configurable headers and base URL**
- **Full type definitions** for all API endpoints

## Installation

```bash
pnpm add @crypto-exchange/api
```

## Usage

### Basic Setup

```typescript
import { createApiClient } from "@crypto-exchange/api";

const apiClient = createApiClient({
  baseUrl: "http://localhost:3001",
  timeout: 10000,
  headers: {
    Authorization: "Bearer your-token",
  },
});
```

### API Methods

```typescript
// Health check
const health = await apiClient.health();

// Get all trades
const trades = await apiClient.getTrades();

// Get specific trade
const trade = await apiClient.getTrade("trade-id");

// Create new trade
const newTrade = await apiClient.createTrade({
  pair: "BTC/USD",
  amount: 0.5,
  price: 45000,
  type: "buy",
});
```

### Error Handling

```typescript
import type { ApiError } from "@crypto-exchange/api";

try {
  const trades = await apiClient.getTrades();
} catch (error) {
  const apiError = error as ApiError;
  console.error(`API Error: ${apiError.message} (${apiError.statusCode})`);
}
```

### Type Definitions

```typescript
import type {
  CreateTradeRequest,
  TradeWithCalculations,
  GetTradesResponse,
  ApiResponse,
} from "@crypto-exchange/api";
```

## API Types

- `ApiResponse<T>` - Standard API response wrapper
- `CreateTradeRequest` - Request payload for creating trades
- `TradeWithCalculations` - Trade object with calculated fields
- `GetTradesResponse` - Response type for trades endpoint
- `HealthResponse` - Response type for health endpoint
- `ApiError` - Error type for API exceptions

## Configuration

The API client accepts the following configuration options:

```typescript
interface ApiClientConfig {
  baseUrl: string; // API base URL
  timeout?: number; // Request timeout in milliseconds (default: 10000)
  headers?: Record<string, string>; // Additional headers
}
```
