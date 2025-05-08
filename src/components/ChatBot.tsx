import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Bot, SendHorizontal } from "lucide-react";

// Extended knowledge base with more e-commerce-related questions
const knowledgeBase = [
  { question: "free shipping", answer: "Yes, free shipping is available for orders above $50." },
  { question: "return policy", answer: "Returns are accepted within 30 days with original packaging." },
  { question: "delivery time", answer: "Standard delivery takes 3-5 business days." },
  { question: "international shipping", answer: "Yes, we ship worldwide!" },
  { question: "track order", answer: "Use your tracking number from the confirmation email or account." },
  { question: "payment methods", answer: "We accept credit cards, debit cards, PayPal, and digital wallets." },
  { question: "secure payment", answer: "Your payment is protected with advanced encryption technology." },
  { question: "out of stock", answer: "You can request a restock notification or explore similar products." },
  { question: "cancel order", answer: "Orders can be canceled within 24 hours before dispatch." },
  { question: "refund process", answer: "Refunds are processed within 7-10 business days." },
  { question: "loyalty program", answer: "Earn reward points with every purchase!" },
  { question: "change shipping address", answer: "You can update your address within 6 hours of purchase." },
  { question: "brands available", answer: "We carry various brands including top international and local ones." },
  { question: "product warranty", answer: "Most products come with a standard manufacturer warranty. Details are available on the product page." },
  { question: "modify order", answer: "Changes can be made within a few hours of ordering through your account." },
  { question: "gift wrapping", answer: "Yes, we offer gift wrapping at checkout." },
  { question: "bulk order discount", answer: "For bulk purchases, contact support for special pricing." },
  { question: "apply discount code", answer: "Enter the discount code at checkout under 'Apply Code'." },
  { question: "same-day delivery", answer: "Same-day delivery is available in select locations." },
  { question: "lost package", answer: "If your package is lost, please contact support for a resolution." },
  { question: "shipping fees by region", answer: "Shipping costs depend on the destination and are calculated at checkout." },
  { question: "return sale item", answer: "Sale items may have special return conditions. Check the product page for details." },
  { question: "file return request", answer: "Initiate a return via your account dashboard or contact support." },
  { question: "pay in installments", answer: "Installment payments are available via select payment options at checkout." },
  { question: "update saved payment", answer: "Go to 'Payment Settings' in your account to update payment methods." },
  { question: "payment failure", answer: "If a payment fails, check your details or try a different method." },
  { question: "unsubscribe from emails", answer: "Manage your email preferences in your account settings." },
  { question: "customer reviews", answer: "Read reviews on each product page from verified customers." },
  { question: "shop mobile app", answer: "Download our mobile app for an optimized shopping experience!" }
];

// Function to find the best match dynamically using flexible search
const findBestMatch = (input) => {
  const lowerInput = input.toLowerCase();
  return knowledgeBase.find(({ question }) =>
    lowerInput.includes(question) || question.split(" ").some(word => lowerInput.includes(word))
  );
};

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input.trim(), isUser: true };
    setMessages([...messages, userMessage]);

    const response = findBestMatch(input);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        response
          ? { text: response.answer, isUser: false }
          : { text: "I'm sorry, I don't have information about that. Can I help you with something else?", isUser: false }
      ]);
    }, 500);

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button onClick={toggleChat} className="rounded-full p-4 h-14 w-14 bg-primary shadow-lg hover:bg-accent">
        {isOpen ? <MessageCircle /> : <Bot />}
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-border overflow-hidden">
          <div className="bg-primary p-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <h3 className="font-medium">Shop Assistant</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-primary/80" onClick={toggleChat}>
              ✖️
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 max-w-[80%] ${message.isUser ? "ml-auto" : "mr-auto"}`}>
                <div className={`p-3 rounded-lg ${message.isUser ? "bg-accent text-white" : "bg-muted"}`}>
                  {message.text}
                </div>
                <div ref={index === messages.length - 1 ? messagesEndRef : null} />
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input placeholder="Type your question..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
              <Button onClick={handleSend} size="icon" className="bg-primary hover:bg-accent">
                <SendHorizontal size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
