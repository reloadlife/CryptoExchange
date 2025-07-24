import {
  TrendingUp,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

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

function getCategoryColor(category: string) {
  switch (category) {
    case "Platform Update":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Integration":
      return "bg-green-100 text-green-800 border-green-200";
    case "Security":
      return "bg-red-100 text-red-800 border-red-200";
    case "Partnership":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Community":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export default function NewsSection() {
  const featuredNews = newsUpdates.filter((news) => news.featured).slice(0, 2);
  const recentNews = newsUpdates.filter((news) => !news.featured).slice(0, 4);

  return (
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
            {featuredNews.map((news) => (
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
                      className={getCategoryColor(news.category)}
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
            {recentNews.map((news) => (
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
                          className={`text-xs ${getCategoryColor(
                            news.category
                          )}`}
                        >
                          {news.category}
                        </Badge>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(news.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
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
                Get the latest SwapFlow updates, DeFi insights, and trading tips
                delivered to your inbox.
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
  );
}
