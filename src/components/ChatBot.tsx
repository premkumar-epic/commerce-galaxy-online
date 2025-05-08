
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Bot, SendHorizontal } from 'lucide-react';

// Define the knowledge base (you can replace this with your own data)
const knowledgeBase = [
  {
    question: "Do you offer free shipping?",
    answer: "Yes, we offer free shipping on all orders over $50. Orders below $50 have a flat rate shipping fee of $5."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Items must be in original condition with tags attached."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days. Express shipping options are available at checkout."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. International shipping rates are calculated at checkout."
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order through the 'Orders' section in your account or using the tracking number provided in your shipping confirmation email."
  }
];

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

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { text: input.trim(), isUser: true };
    setMessages([...messages, userMessage]);
    
    // Find response from knowledge base or use default
    const lowerInput = input.toLowerCase();
    const response = knowledgeBase.find(item => 
      item.question.toLowerCase().includes(lowerInput) || 
      lowerInput.includes(item.question.toLowerCase().split(" ").filter(word => word.length > 3).join(" "))
    );

    setTimeout(() => {
      if (response) {
        setMessages(prev => [...prev, { text: response.answer, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "I'm sorry, I don't have information about that. Can I help you with something else?", 
          isUser: false 
        }]);
      }
    }, 500);
    
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className="rounded-full p-4 h-14 w-14 bg-primary shadow-lg hover:bg-accent transition-all duration-300"
        aria-label="Toggle chat"
      >
        {isOpen ? <MessageCircle /> : <Bot />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-border overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-primary p-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <h3 className="font-medium">Shop Assistant</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white hover:bg-primary/80" onClick={toggleChat}>
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 max-w-[80%] ${
                  message.isUser ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.isUser
                      ? "bg-accent text-white rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
                <div ref={index === messages.length - 1 ? messagesEndRef : null} />
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="flex-shrink-0 bg-primary hover:bg-accent">
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
