
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AIMessage {
  role: 'user' | 'ai';
  content: string;
}

interface AIChatProps {
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'ai',
      content: 'Hello! I\'m your NYC Business Assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse: AIMessage;
      
      // Simple rule-based responses
      if (input.toLowerCase().includes('register') || input.toLowerCase().includes('start') || input.toLowerCase().includes('new business')) {
        aiResponse = {
          role: 'ai',
          content: 'To register a new business in NYC, our platform can help guide you through the process. We\'ll help you with forms, permits, and licenses specific to your industry. Would you like to create an account to get started?'
        };
      } else if (input.toLowerCase().includes('price') || input.toLowerCase().includes('cost') || input.toLowerCase().includes('plan')) {
        aiResponse = {
          role: 'ai',
          content: 'We offer flexible pricing plans starting at $29/month for startups, $79/month for growing businesses, and custom pricing for enterprises. All plans come with a 14-day free trial. Would you like me to explain the features included in each plan?'
        };
      } else if (input.toLowerCase().includes('mwbe') || input.toLowerCase().includes('certification')) {
        aiResponse = {
          role: 'ai',
          content: 'Our platform includes guided application workflows for MWBE certification. We help you gather the necessary documentation, fill out forms correctly, and track your application status. This can significantly increase your approval chances and reduce the time to get certified.'
        };
      } else {
        aiResponse = {
          role: 'ai',
          content: 'Thank you for your question. Our platform is designed to help NYC businesses with everything from registration to daily operations. Would you like to schedule a demo to see how we can help your specific business needs?'
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
    <div className="flex flex-col h-[500px]">
      <div className="bg-nyc-primary text-white p-4 flex justify-between items-center">
        <h3 className="font-semibold">NYC Business Assistant</h3>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-nyc-secondary text-white rounded-br-none' 
                  : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-white text-gray-800 shadow-sm rounded-bl-none">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse delay-100"></div>
                <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4 bg-white">
        <div className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
