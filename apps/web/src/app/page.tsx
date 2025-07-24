"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Menu,
  X,
  Search,
  Filter,
  Star,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Download,
  MessageCircle,
  Twitter,
  Github,
  Mail,
  MapPin,
  Calendar,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DEXLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChain, setSelectedChain] = useState("all");

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

  const testimonials = [
    {
      name: "Alex Chen",
      handle: "@alexchen_defi",
      content:
        "Finally, a DEX that actually works! The UI is clean, trades are fast, and I never worry about my funds being locked up. This is the future of trading.",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    {
      name: "Sarah Martinez",
      handle: "@sarahm_crypto",
      content:
        "Been using this DEX for 6 months now. The gas optimization is incredible - saving me hundreds in fees compared to other platforms. Highly recommend!",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    {
      name: "Mike Thompson",
      handle: "@mikethompson",
      content:
        "The Telegram Mini App is a game changer. I can trade on the go without compromising security. The team really thought about user experience.",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  ];

  const newsUpdates = [
    {
      id: 1,
      title: "SwapFlow V2.0 Launch: 50% Lower Gas Fees",
      excerpt:
        "Our latest update introduces advanced gas optimization, reducing transaction costs by up to 50% across all supported chains.",
      category: "Platform Update",
      date: "2024-01-15",
      readTime: "3 min read",
      featured: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "New Partnership with Chainlink for Price Feeds",
      excerpt:
        "Enhanced price accuracy and reliability through integration with Chainlink's decentralized oracle network.",
      category: "Partnership",
      date: "2024-01-12",
      readTime: "2 min read",
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Arbitrum Integration Now Live",
      excerpt:
        "Trade with lightning speed and minimal fees on Arbitrum. Over 100 tokens now available on Layer 2.",
      category: "Integration",
      date: "2024-01-10",
      readTime: "4 min read",
      featured: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Security Audit Completed by CertiK",
      excerpt:
        "SwapFlow smart contracts receive 96/100 security score from leading blockchain security firm CertiK.",
      category: "Security",
      date: "2024-01-08",
      readTime: "5 min read",
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Mobile App Beta Testing Program",
      excerpt:
        "Join our exclusive beta program and be among the first to experience SwapFlow's native mobile trading app.",
      category: "Community",
      date: "2024-01-05",
      readTime: "2 min read",
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "DeFi Market Analysis: Q4 2023 Report",
      excerpt:
        "Comprehensive analysis of DeFi trends, trading volumes, and market insights from the past quarter.",
      category: "Market Analysis",
      date: "2024-01-03",
      readTime: "8 min read",
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const faqs = [
    {
      question: "What is a decentralized exchange (DEX)?",
      answer:
        "A DEX is a cryptocurrency exchange that operates without a central authority. Users trade directly with each other through smart contracts, maintaining full control of their funds throughout the process.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply connect your Web3 wallet (like MetaMask) to our platform, or download our mobile app. No registration or KYC required - you can start trading immediately.",
    },
    {
      question: "What are the trading fees?",
      answer:
        "Our trading fees are among the lowest in the industry at just 0.25% per trade. Liquidity providers earn a portion of these fees as rewards for providing liquidity to the pools.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes, your funds never leave your wallet until you execute a trade. Our smart contracts are audited by leading security firms, and we use battle-tested protocols for maximum security.",
    },
    {
      question: "What tokens can I trade?",
      answer:
        "We support hundreds of tokens across multiple blockchains including Ethereum, Polygon, and Arbitrum. Our platform automatically finds the best routes for your trades.",
    },
    {
      question: "How does the Telegram Mini App work?",
      answer:
        "Our Telegram Mini App provides a seamless trading experience within Telegram. You can check prices, execute trades, and manage your portfolio without leaving the chat interface.",
    },
  ];

  const tokens = [
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "$2,345.67",
      change: "+5.23%",
      volume: "$1.2B",
      chain: "ethereum",
      logo: "/placeholder.svg?height=32&width=32",
      popular: true,
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "$43,210.89",
      change: "+2.15%",
      volume: "$890M",
      chain: "bitcoin",
      logo: "/placeholder.svg?height=32&width=32",
      popular: true,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      price: "$1.00",
      change: "+0.01%",
      volume: "$2.1B",
      chain: "ethereum",
      logo: "/placeholder.svg?height=32&width=32",
      popular: true,
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      price: "$0.89",
      change: "+8.45%",
      volume: "$156M",
      chain: "polygon",
      logo: "/placeholder.svg?height=32&width=32",
      popular: false,
    },
    {
      symbol: "ARB",
      name: "Arbitrum",
      price: "$1.23",
      change: "-1.23%",
      volume: "$89M",
      chain: "arbitrum",
      logo: "/placeholder.svg?height=32&width=32",
      popular: false,
    },
    {
      symbol: "UNI",
      name: "Uniswap",
      price: "$6.78",
      change: "+3.45%",
      volume: "$234M",
      chain: "ethereum",
      logo: "/placeholder.svg?height=32&width=32",
      popular: true,
    },
  ];

  const securityBadges = [
    {
      name: "CertiK Audit",
      status: "Verified",
      date: "Dec 2023",
      score: "96/100",
      icon: CheckCircle,
    },
    {
      name: "Quantstamp",
      status: "Verified",
      date: "Nov 2023",
      score: "A+",
      icon: Shield,
    },
    {
      name: "OpenZeppelin",
      status: "Verified",
      date: "Oct 2023",
      score: "Excellent",
      icon: CheckCircle,
    },
    {
      name: "Bug Bounty",
      status: "Active",
      date: "Ongoing",
      score: "$100K+",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Hero Section */}
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose SwapFlow?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for traders who demand speed, security, and the best
              possible prices.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-none bg-background/50"
              >
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

      {/* Token Listing Section */}
      <section id="tokens" className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Supported Tokens</h2>
            <p className="text-xl text-muted-foreground">
              Trade 500+ tokens across multiple blockchains
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedChain} onValueChange={setSelectedChain}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Chains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Chains</SelectItem>
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="arbitrum">Arbitrum</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Popular Tokens */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Popular Tokens
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tokens
                .filter((token) => token.popular)
                .filter(
                  (token) =>
                    token.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    token.symbol
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .filter(
                  (token) =>
                    selectedChain === "all" || token.chain === selectedChain
                )
                .map((token, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={token.logo || "/placeholder.svg"}
                            alt={token.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <h4 className="font-semibold">{token.symbol}</h4>
                            <p className="text-sm text-muted-foreground">
                              {token.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{token.price}</p>
                          <p
                            className={`text-sm ${
                              token.change.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {token.change}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t flex justify-between text-sm text-muted-foreground">
                        <span>Volume: {token.volume}</span>
                        <Badge variant="outline" className="text-xs">
                          {token.chain}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Tokens */}
          <div>
            <h3 className="text-lg font-semibold mb-4">All Tokens</h3>
            <div className="grid gap-2">
              {tokens
                .filter(
                  (token) =>
                    token.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    token.symbol
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .filter(
                  (token) =>
                    selectedChain === "all" || token.chain === selectedChain
                )
                .map((token, index) => (
                  <Card
                    key={index}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={token.logo || "/placeholder.svg"}
                            alt={token.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <div>
                            <span className="font-medium">{token.symbol}</span>
                            <span className="text-muted-foreground ml-2">
                              {token.name}
                            </span>
                          </div>
                          {token.popular && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="font-medium">{token.price}</span>
                          <span
                            className={`${
                              token.change.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {token.change}
                          </span>
                          <span className="text-muted-foreground">
                            {token.volume}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {token.chain}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline">
              View All 500+ Tokens
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Traders Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied users trading on SwapFlow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-sm">
                          {testimonial.name}
                        </h4>
                        {testimonial.verified && (
                          <div className="h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.handle}
                      </p>
                    </div>
                    <Twitter className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm leading-relaxed">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest News & Updates
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay informed about platform developments and DeFi trends
            </p>
          </div>

          {/* Featured News */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Featured Updates
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {newsUpdates
                .filter((news) => news.featured)
                .slice(0, 2)
                .map((news) => (
                  <Card
                    key={news.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className={`${
                            news.category === "Platform Update"
                              ? "bg-blue-100 text-blue-800"
                              : news.category === "Integration"
                              ? "bg-green-100 text-green-800"
                              : news.category === "Security"
                              ? "bg-red-100 text-red-800"
                              : news.category === "Partnership"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {news.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(news.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{news.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        <span>Read More</span>
                        <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6">Recent Updates</h3>
            <div className="space-y-4">
              {newsUpdates
                .filter((news) => !news.featured)
                .slice(0, 4)
                .map((news) => (
                  <Card
                    key={news.id}
                    className="hover:shadow-md transition-shadow group cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={news.image || "/placeholder.svg"}
                            alt={news.title}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                news.category === "Platform Update"
                                  ? "border-blue-200 text-blue-700"
                                  : news.category === "Integration"
                                  ? "border-green-200 text-green-700"
                                  : news.category === "Security"
                                  ? "border-red-200 text-red-700"
                                  : news.category === "Partnership"
                                  ? "border-purple-200 text-purple-700"
                                  : news.category === "Community"
                                  ? "border-orange-200 text-orange-700"
                                  : "border-gray-200 text-gray-700"
                              }`}
                            >
                              {news.category}
                            </Badge>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(news.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{news.readTime}</span>
                              </div>
                            </div>
                          </div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                            {news.title}
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {news.excerpt}
                          </p>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Stay Updated</h3>
                <p className="text-muted-foreground">
                  Get the latest SwapFlow updates, DeFi insights, and trading
                  tips delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="flex-1"
                />
                <Button className="sm:w-auto">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam, unsubscribe at any time. Read our{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* View All News Button */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All News & Updates
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about SwapFlow
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                  <span className="block text-yellow-300">
                    Under 30 Seconds
                  </span>
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
                <p className="text-sm opacity-75">
                  Trusted by traders worldwide
                </p>
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

      {/* Footer */}
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
              © {new Date().getFullYear()} SwapFlow. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
