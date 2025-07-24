"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApi } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ApiStats() {
  const { useHealth, useTrades } = useApi();
  const { data: health, isLoading: healthLoading } = useHealth();
  const { data: trades, isLoading: tradesLoading } = useTrades();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>API Status</CardTitle>
        </CardHeader>
        <CardContent>
          {healthLoading ? (
            <Skeleton className="h-6 w-20" />
          ) : health?.data ? (
            <Badge variant="default">{health.data.status}</Badge>
          ) : (
            <Badge variant="destructive">Offline</Badge>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trade Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {tradesLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : trades?.data ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Trades:</span>
                <span className="font-semibold">{trades.data.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recent Trades:</span>
                <span className="font-semibold">
                  {trades.data.trades.length}
                </span>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertDescription>
                Unable to load trade statistics
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
