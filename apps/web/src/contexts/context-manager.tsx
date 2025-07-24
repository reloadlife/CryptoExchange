"use client";

import { ReactNode } from "react";
import { AppProvider } from "./app-context";
import { UserProvider } from "./user-context";

interface ContextManagerProps {
  children: ReactNode;
}

export function ContextManager({ children }: ContextManagerProps) {
  return (
    <AppProvider>
      <UserProvider>{children}</UserProvider>
    </AppProvider>
  );
}
