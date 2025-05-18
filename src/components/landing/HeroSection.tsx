
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);
  
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

  // Array of colorful badges to display in a staggered animation
  const colorfulBadges = [
    { text: "NYC's #1 Business Platform", color: "bg-gradient-blue-purple text-white" },
    { text: "5-Star Rated", icon: <Star className="mr-1 h-4 w-4" />, color: "bg-gradient-orange-pink text-white" },
    { text: "AI-Powered", icon: <Sparkles className="mr-1 h-4 w-4" />, color: "bg-gradient-green-teal text-white" },
  ];
  
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-24 px-4 md:px-8 overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            {/* Animated badges */}
            <div className="flex flex-wrap gap-2">
              {colorfulBadges.map((badge, index) => (
                <div 
                  key={index}
                  className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-md border border-white/20 ${badge.color} mb-2 stagger-appear hover-scale`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {badge.icon && badge.icon}
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`${isHovered ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white'} text-nyc-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-glow-blue rounded-2xl text-lg font-medium`}
              >
                <Link to="/register" className="flex items-center">
                  Get Started Free
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                </Link>
              </Button>
              <Button
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10 rounded-2xl text-lg font-medium hover-glow"
                onClick={scrollToFeatures}
              >
                Explore Features
              </Button>
            </div>
            
            <div className="pt-8 flex items-center space-x-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden hover-scale"
                    style={{ zIndex: 5-i, transition: 'transform 0.3s ease', transitionDelay: `${i * 0.05}s` }}
                  >
                    <img 
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${20 + i}.jpg`} 
                      alt="Customer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white/90 text-sm md:text-base">
                  <span className="font-semibold text-gradient-rainbow">Trusted by 3,000+</span> NYC Small Businesses
                </p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-1 text-white/80 text-xs">5.0 (500+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className={`transform transition-all duration-1000 ease-out ${scrollPosition > 100 ? 'translate-y-10 opacity-80' : 'translate-y-0 opacity-100'}`}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="NYC Business Dashboard" 
                  className="rounded-2xl shadow-2xl border border-white/20 transform hover:scale-[1.02] transition-transform duration-500 colorful-shadow"
                />
                
                {/* Floating badges around the image */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 float-animation text-white">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-white rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Real-time Updates</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 text-white">
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Dashboard</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg transform -translate-y-1/2 hover:scale-105 transition-transform duration-300 bounce-animation text-white">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">AI-Powered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110 shadow-glow-purple" onClick={scrollToFeatures}>
          <ArrowRight className="text-white transform rotate-90" size={20} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
