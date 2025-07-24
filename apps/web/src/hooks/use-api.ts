import { useMemo } from "react";
import { createApiClient, createApiHooks } from "@crypto-exchange/sdk";
import { env } from "@/env";

export function useApi() {
  const apiClient = useMemo(
    () =>
      createApiClient({
        baseUrl: env.NEXT_PUBLIC_API_URL,
        timeout: 10000,
      }),
    []
  );

  const hooks = useMemo(() => createApiHooks(apiClient), [apiClient]);

  return {
    client: apiClient,
    ...hooks,
  };
}
