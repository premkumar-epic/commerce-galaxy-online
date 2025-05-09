
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Bot, SendHorizontal } from 'lucide-react';

// Define the knowledge base (customizable)
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

// Type for word prediction
interface WordPrediction {
  word: string;
  confidence: number;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState<WordPrediction[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [userPhrases, setUserPhrases] = useState<string[]>([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Enhanced algorithm for more efficient matching
  const findBestResponse = (userInput: string) => {
    if (!userInput) return null;
    
    const userWords = userInput.toLowerCase().split(" ");
    
    // Score each item in the knowledge base
    let bestMatch = {
      answer: "",
      score: 0
    };
    
    knowledgeBase.forEach(item => {
      const questionWords = item.question.toLowerCase().split(" ");
      
      // Calculate word match score
      let score = 0;
      userWords.forEach(word => {
        if (word.length <= 2) return; // Skip very short words
        
        if (item.question.toLowerCase().includes(word.toLowerCase())) {
          score += 3; // Exact word match
        }
        
        // Find similar words (simple stemming)
        questionWords.forEach(qWord => {
          if (qWord.length > 3 && word.length > 3) {
            if (qWord.startsWith(word) || word.startsWith(qWord)) {
              score += 1; // Partial word match
            }
          }
        });
      });
      
      // Check for consecutive word matches (phrases)
      for (let i = 0; i < userWords.length - 1; i++) {
        const twoWordPhrase = `${userWords[i]} ${userWords[i+1]}`.toLowerCase();
        if (item.question.toLowerCase().includes(twoWordPhrase)) {
          score += 5; // Phrase match bonus
        }
      }
      
      // Context-based scoring
      if (userInput.includes("?")) score += 1; // Question mark bonus
      
      // Update best match if current score is higher
      if (score > bestMatch.score) {
        bestMatch = {
          answer: item.answer,
          score: score
        };
      }
    });
    
    // Only return a match if it has a minimum confidence score
    return bestMatch.score >= 3 ? bestMatch.answer : null;
  };

  // Function to predict next word based on input
  const predictNextWords = (text: string) => {
    if (!text.trim()) {
      setPredictions([]);
      return;
    }
    
    const words = text.toLowerCase().split(" ");
    const lastWord = words[words.length - 1];
    
    // Build prediction models from knowledge base and past user inputs
    let wordFrequencyMap: Record<string, number> = {};
    let nextWordMap: Record<string, Record<string, number>> = {};
    
    // Add knowledge base data to prediction model
    knowledgeBase.forEach(item => {
      const questionWords = item.question.toLowerCase().split(" ");
      
      questionWords.forEach((word, index) => {
        // Count word frequencies
        wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
        
        // Map next words
        if (index < questionWords.length - 1) {
          if (!nextWordMap[word]) nextWordMap[word] = {};
          const nextWord = questionWords[index + 1];
          nextWordMap[word][nextWord] = (nextWordMap[word][nextWord] || 0) + 1;
        }
      });
    });
    
    // Add user's past messages to the model
    userPhrases.forEach(phrase => {
      const phraseWords = phrase.toLowerCase().split(" ");
      
      phraseWords.forEach((word, index) => {
        wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
        
        if (index < phraseWords.length - 1) {
          if (!nextWordMap[word]) nextWordMap[word] = {};
          const nextWord = phraseWords[index + 1];
          nextWordMap[word][nextWord] = (nextWordMap[word][nextWord] || 0) + 1;
        }
      });
    });
    
    // Generate predictions
    let possibleNextWords: WordPrediction[] = [];
    
    if (nextWordMap[lastWord]) {
      // Get next words based on last word
      Object.entries(nextWordMap[lastWord]).forEach(([word, count]) => {
        possibleNextWords.push({
          word,
          confidence: count
        });
      });
    }
    
    // If no specific next words, suggest common words
    if (possibleNextWords.length === 0) {
      Object.entries(wordFrequencyMap)
        .filter(([word]) => word.startsWith(lastWord) && word !== lastWord)
        .forEach(([word, count]) => {
          possibleNextWords.push({
            word,
            confidence: count
          });
        });
    }
    
    // Sort by confidence and take top 3
    const topPredictions = possibleNextWords
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
      
    setPredictions(topPredictions);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { text: input.trim(), isUser: true };
    setMessages([...messages, userMessage]);
    
    // Store user phrase for future predictions
    setUserPhrases(prev => [...prev, input.trim()]);
    
    // Find response using enhanced algorithm
    const response = findBestResponse(input);

    setTimeout(() => {
      if (response) {
        setMessages(prev => [...prev, { text: response, isUser: false }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "I'm sorry, I don't have information about that. Can I help you with something else?", 
          isUser: false 
        }]);
      }
    }, 300);
    
    setInput("");
    setPredictions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Update predictions as user types
  useEffect(() => {
    predictNextWords(input);
  }, [input]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Apply a word prediction
  const applyPrediction = (word: string) => {
    const words = input.split(" ");
    words.pop(); // Remove last partial word
    setInput([...words, word, ""].join(" ")); // Add prediction with space
    inputRef.current?.focus();
  };

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
          
          <div className="p-3 border-t border-border bg-card flex flex-col gap-2">
            {predictions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {predictions.map((pred, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    className="text-xs py-0 h-6"
                    onClick={() => applyPrediction(pred.word)}
                  >
                    {pred.word}
                  </Button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                ref={inputRef}
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
