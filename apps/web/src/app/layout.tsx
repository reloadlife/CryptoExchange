import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { ContextManager } from "@/contexts/context-manager";

export const metadata: Metadata = {
  title: "Crypto Exchange",
  description: "A modern crypto exchange platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Providers>
          <ContextManager>{children}</ContextManager>
        </Providers>
      </body>
    </html>
  );
}
