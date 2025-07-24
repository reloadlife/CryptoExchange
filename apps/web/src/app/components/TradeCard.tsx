"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApi } from "@/hooks/use-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TradeCardProps {
  tradeId?: string;
}

export function TradeCard({ tradeId }: TradeCardProps) {
  const { useTrade } = useApi();
  const { data: trade, isLoading, error } = useTrade(tradeId || "");

  if (!tradeId) {
    return (
      <Alert>
        <AlertDescription>No trade ID provided</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load trade: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!trade?.data) {
    return (
      <Alert>
        <AlertDescription>Trade not found</AlertDescription>
      </Alert>
    );
  }

  const tradeData = trade.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{tradeData.pair}</span>
          <Badge variant={tradeData.type === "buy" ? "default" : "secondary"}>
            {tradeData.type.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount:</span>
          <span>{tradeData.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Price:</span>
          <span>{tradeData.formattedPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-semibold">{tradeData.totalValue}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Fee:</span>
          <span>{tradeData.fee}</span>
        </div>
      </CardContent>
    </Card>
  );
}
