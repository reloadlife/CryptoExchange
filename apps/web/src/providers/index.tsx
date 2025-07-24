"use client";

import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { LocaleProvider } from "@/providers/locale-provider";

interface ProvidersProps {
  children: React.ReactNode;
  locale?: string;
}

export function Providers({ children, locale = "en" }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export * from "@/providers/theme-provider";
export * from "@/providers/query-provider";
export * from "@/providers/locale-provider";
