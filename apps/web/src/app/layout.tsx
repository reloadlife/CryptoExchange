import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <header className="border-b bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Crypto Exchange</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="border-t bg-gray-50 mt-auto">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
              <p>&copy; 2024 Crypto Exchange. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
