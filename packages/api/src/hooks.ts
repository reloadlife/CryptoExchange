import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiClient } from "./client.js";
import type { CreateTradeRequest } from "./types.js";

export function createApiHooks(apiClient: ApiClient) {
  const queryKeys = {
    all: ["api"] as const,
    health: () => [...queryKeys.all, "health"] as const,
    trades: () => [...queryKeys.all, "trades"] as const,
    trade: (id: string) => [...queryKeys.trades(), id] as const,
  };

  function useHealth() {
    return useQuery({
      queryKey: queryKeys.health(),
      queryFn: () => apiClient.health(),
      staleTime: 30 * 1000,
      refetchInterval: 60 * 1000,
    });
  }

  function useTrades() {
    return useQuery({
      queryKey: queryKeys.trades(),
      queryFn: () => apiClient.getTrades(),
      staleTime: 10 * 1000,
    });
  }

  function useTrade(id: string) {
    return useQuery({
      queryKey: queryKeys.trade(id),
      queryFn: () => apiClient.getTrade(id),
      enabled: !!id,
      staleTime: 30 * 1000,
    });
  }

  function useCreateTrade() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (trade: CreateTradeRequest) => apiClient.createTrade(trade),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.trades() });
      },
    });
  }

  function useInvalidateTrades() {
    const queryClient = useQueryClient();

    return () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trades() });
    };
  }

  function useInvalidateTrade(id: string) {
    const queryClient = useQueryClient();

    return () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trade(id) });
    };
  }

  return {
    queryKeys,
    useHealth,
    useTrades,
    useTrade,
    useCreateTrade,
    useInvalidateTrades,
    useInvalidateTrade,
  };
}

export type ApiHooks = ReturnType<typeof createApiHooks>;
