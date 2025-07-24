import type {
  ApiClientConfig,
  ApiError,
  ApiResponse,
  CreateTradeRequest,
  CreateTradeResponse,
  GetTradeResponse,
  GetTradesResponse,
  HealthResponse,
} from "./types.js";

export class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.timeout = config.timeout ?? 10000;
    this.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = {
          message:
            errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          details: errorData,
        };
        throw error;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        const timeoutError: ApiError = {
          message: "Request timeout",
          statusCode: 408,
        };
        throw timeoutError;
      }

      throw error;
    }
  }

  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>("/api/health");
  }

  async getTrades(): Promise<GetTradesResponse> {
    return this.request<GetTradesResponse>("/api/trades");
  }

  async getTrade(id: string): Promise<GetTradeResponse> {
    return this.request<GetTradeResponse>(
      `/api/trades/${encodeURIComponent(id)}`
    );
  }

  async createTrade(trade: CreateTradeRequest): Promise<CreateTradeResponse> {
    return this.request<CreateTradeResponse>("/api/trades", {
      method: "POST",
      body: JSON.stringify(trade),
    });
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  removeHeader(key: string): void {
    delete this.headers[key];
  }
}

export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
