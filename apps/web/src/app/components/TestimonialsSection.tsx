import { Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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

export default function TestimonialsSection() {
  return (
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
                <p className="text-sm leading-relaxed">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
