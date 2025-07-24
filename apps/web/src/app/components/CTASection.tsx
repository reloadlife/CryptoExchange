import { Shield, Zap, Users, Download, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative p-12 text-center space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
              >
                🎉 Zero Gas Fees for First 30 Days
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold">
                Start Trading in
                <span className="block text-yellow-300">Under 30 Seconds</span>
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                No registration, no KYC, no waiting. Connect your wallet and
                start trading with the best rates in DeFi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100 flex-1"
              >
                <Download className="mr-2 h-5 w-5" />
                Get Mobile App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent flex-1"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Try on Telegram
              </Button>
            </div>

            <div className="pt-6 space-y-4">
              <p className="text-sm opacity-75">Trusted by traders worldwide</p>
              <div className="flex justify-center items-center space-x-8 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Audited Smart Contracts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Instant Settlements</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>50K+ Active Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
