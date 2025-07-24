"use client";

import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">SwapFlow</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#tokens"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Tokens
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#help"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Help
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Button variant="outline" size="sm">
            Launch App
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            <Link
              href="#about"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="#features"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#tokens"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Tokens
            </Link>
            <Link
              href="#pricing"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#help"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Help
            </Link>
            <Link
              href="#contact"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Button className="w-full mt-4">Launch App</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
