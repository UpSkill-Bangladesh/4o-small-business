
import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from '@/hooks/use-theme';

interface AIMessage {
  role: 'user' | 'ai';
  content: string;
}

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'ai',
      content: 'Hello! I\'m your NYC Business Assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: AIMessage = {
      role: 'user',
      content: input.trim()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    // Store the question to respond to
    const question = input.trim();

    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      let aiResponse: AIMessage;
      
      // Simple rule-based responses
      if (question.toLowerCase().includes('register') || question.toLowerCase().includes('start') || question.toLowerCase().includes('new business')) {
        aiResponse = {
          role: 'ai',
          content: 'To register a new business in NYC, our platform can help guide you through the process. We\'ll help you with forms, permits, and licenses specific to your industry. Would you like to create an account to get started?'
        };
      } else if (question.toLowerCase().includes('price') || question.toLowerCase().includes('cost') || question.toLowerCase().includes('plan')) {
        aiResponse = {
          role: 'ai',
          content: 'We offer flexible pricing plans starting at $29/month for startups, $79/month for growing businesses, and custom pricing for enterprises. All plans come with a 14-day free trial. Would you like me to explain the features included in each plan?'
        };
      } else if (question.toLowerCase().includes('mwbe') || question.toLowerCase().includes('certification')) {
        aiResponse = {
          role: 'ai',
          content: 'Our platform includes guided application workflows for MWBE certification. We help you gather the necessary documentation, fill out forms correctly, and track your application status. This can significantly increase your approval chances and reduce the time to get certified.'
        };
      } else {
        aiResponse = {
          role: 'ai',
          content: 'Thank you for your question about "' + question + '". Our platform is designed to help NYC businesses with everything from registration to daily operations. Would you like to schedule a demo to see how we can help your specific business needs?'
        };
      }
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-gray-800">
      <div className="bg-nyc-primary text-white p-4 flex justify-between items-center dark:bg-nyc-primary/90">
        <h3 className="font-semibold flex items-center gap-2">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          NYC Business Assistant
        </h3>
        <button 
          onClick={onClose} 
          className="text-white hover:text-gray-300 hover:bg-white/10 p-1.5 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-nyc-secondary text-white rounded-br-none hover:bg-nyc-secondary/90 transition-colors' 
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-none dark:bg-gray-800 dark:text-gray-200 hover:shadow-md transition-all'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-white text-gray-800 shadow-sm rounded-bl-none dark:bg-gray-800 dark:text-gray-200">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-nyc-primary rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-nyc-primary rounded-full animate-pulse delay-100"></div>
                <div className="h-2 w-2 bg-nyc-primary rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            disabled={isLoading}
            className="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-nyc-primary"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            size="icon"
            className="bg-nyc-primary hover:bg-nyc-primary/90 hover:scale-105 transition-transform"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
