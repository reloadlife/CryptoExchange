import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function FAQSection() {
  return (
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
  );
}
