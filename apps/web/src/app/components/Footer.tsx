import {
  TrendingUp,
  Twitter,
  Github,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SwapFlow</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The most advanced decentralized exchange for seamless crypto
              trading.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                Web App
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                Mobile App
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                Telegram Bot
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                API Documentation
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                Trading Guide
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                Security Audits
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary"
              >
                Bug Bounty
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@swapflow.io</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>@SwapFlowSupport</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Global, Decentralized</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} SwapFlow. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
