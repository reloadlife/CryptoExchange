import { ArrowRight, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Now Available on Telegram
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Trade Crypto
            <span className="text-primary block">Seamlessly</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Experience the future of decentralized trading with lightning-fast
            swaps, zero custody risk, and the best prices across all major
            blockchains.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="text-lg px-8 py-6">
              <Download className="mr-2 h-5 w-5" />
              Download App
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Open in Telegram
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-8 text-sm text-muted-foreground pt-8">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>$2.4B+ Volume</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>50K+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <span>500+ Tokens</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
