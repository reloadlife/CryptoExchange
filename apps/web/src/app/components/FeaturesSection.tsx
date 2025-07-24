import { Shield, Zap, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Fully Decentralized",
    description:
      "Trade directly from your wallet with complete control over your funds. No intermediaries, no custody risks.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Execute trades in seconds with our optimized smart contracts and advanced routing algorithms.",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description:
      "Access deep liquidity pools and get the best rates through our intelligent price aggregation.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Governed by the community with transparent voting and decentralized decision making.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why Choose SwapFlow?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for traders who demand speed, security, and the best possible
            prices.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-none bg-background/50">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
