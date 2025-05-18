
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TypewriterEffect from '@/components/ui/typewriter-effect';
import HeroBackground from '@/components/ui/hero-background';

const typingPhrases = [
  { text: "Book More Customers" },
  { text: "Sell Smarter" },
  { text: "Grow Faster" },
  { text: "Simplify Compliance" }
];

const HeroSection: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = (e: React.MouseEvent) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-24 px-4 md:px-8 overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-4">
              <span className="text-sm font-medium">NYC's #1 Business Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Empowering <span className="text-gradient">Small Businesses</span> to Thrive
            </h1>
            
            <div className="text-xl md:text-2xl font-medium text-white/80 mb-8 h-12">
              <span>Manage, grow, and </span>
              <TypewriterEffect phrases={typingPhrases} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-nyc-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-glow rounded-2xl text-lg font-medium"
              >
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 rounded-2xl text-lg font-medium"
                onClick={scrollToFeatures}
              >
                Explore Features
              </Button>
            </div>
            
            <div className="pt-8 flex items-center space-x-4">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-white/90 text-sm md:text-base">
                <span className="font-semibold">Trusted by 3,000+</span> NYC Small Businesses
              </p>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className={`transform transition-all duration-1000 ease-out ${scrollPosition > 100 ? 'translate-y-10 opacity-80' : 'translate-y-0 opacity-100'}`}>
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="NYC Business Dashboard" 
                className="rounded-2xl shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Dashboard Updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center cursor-pointer" onClick={scrollToFeatures}>
          <ArrowRight className="text-white transform rotate-90" size={20} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
