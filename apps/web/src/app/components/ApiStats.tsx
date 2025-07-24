"use client";

import { useEffect, useState } from "react";

interface ApiHealth {
  status: string;
  timestamp: string;
}

export function ApiStats() {
  const [apiHealth, setApiHealth] = useState<ApiHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/health");
        if (response.ok) {
          const data = await response.json();
          setApiHealth(data);
          setError(null);
        } else {
          setError("API not responding");
        }
      } catch (err) {
        setError("Failed to connect to API");
      } finally {
        setIsLoading(false);
      }
    };

    checkApiHealth();
    const interval = setInterval(checkApiHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">API Status</h3>
          <p className="text-gray-600">Backend connection health</p>
        </div>

        <div className="text-right">
          {error ? (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-red-600 font-medium">Offline</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 font-medium">{apiHealth?.status || "Unknown"}</span>
            </div>
          )}

          {apiHealth?.timestamp && (
            <p className="text-xs text-gray-500 mt-1">
              Last checked: {new Date(apiHealth.timestamp).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">
            {error}. Make sure the API server is running on port 3001.
          </p>
        </div>
      )}
    </div>
  );
}
