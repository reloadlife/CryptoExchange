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
import { Search, Filter, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

export default function TokensSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChain, setSelectedChain] = useState("all");

  const filteredTokens = tokens.filter(
    (token) =>
      (token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedChain === "all" || token.chain === selectedChain)
  );

  const popularTokens = filteredTokens.filter((token) => token.popular);

  return (
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
        {popularTokens.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Popular Tokens
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTokens.map((token, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
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
        )}

        {/* All Tokens */}
        <div>
          <h3 className="text-lg font-semibold mb-4">All Tokens</h3>
          <div className="grid gap-2">
            {filteredTokens.map((token, index) => (
              <Card key={index} className="hover:bg-muted/50 transition-colors">
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
  );
}
