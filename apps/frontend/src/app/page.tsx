import { Button } from "@crypto-exchange/ui"

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">Crypto Exchange</h1>
          <p className="text-lg text-muted-foreground">Trade cryptocurrencies with confidence</p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Spot Trading</h3>
              <p className="text-muted-foreground mb-4">
                Trade cryptocurrencies at current market prices
              </p>
              <Button variant="default" size="default">
                Start Trading
              </Button>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
              <p className="text-muted-foreground mb-4">Manage your crypto holdings</p>
              <Button variant="outline" size="default">
                View Portfolio
              </Button>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2">Market Data</h3>
              <p className="text-muted-foreground mb-4">
                Real-time cryptocurrency prices and charts
              </p>
              <Button variant="secondary" size="default">
                View Markets
              </Button>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg border text-center">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of traders on our secure platform
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="default" size="lg">
                Sign Up
              </Button>
              <Button variant="ghost" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
