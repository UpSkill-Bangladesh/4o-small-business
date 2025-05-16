
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  BarChart,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Layers,
  MessageCircle,
  Users
} from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/features/AIChat';
import TypewriterEffect from '@/components/ui/typewriter-effect';
import HeroBackground from '@/components/ui/hero-background';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const typingPhrases = [
  { text: "Book More Customers" },
  { text: "Sell Smarter" },
  { text: "Grow Faster" },
  { text: "Simplify Compliance" }
];

const LandingPage: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Enhanced Hero Section */}
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-white" id="features">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-nyc-primary">
              Everything Your NYC Business Needs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From business registration to daily operations, NYC-specific compliance to financial planning, we have you covered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="bg-nyc-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="text-nyc-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NYC Business Setup</h3>
              <p className="text-gray-600">
                Guided registration process, NYC-specific permits, licenses, and MWBE certifications.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="bg-nyc-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Layers className="text-nyc-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete ERP System</h3>
              <p className="text-gray-600">
                Inventory, procurement, expenses, and vendor management all in one place.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="bg-nyc-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-nyc-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CRM & Lead Management</h3>
              <p className="text-gray-600">
                Customer pipeline, lead scoring, and automated follow-ups to grow your business.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="bg-nyc-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="text-nyc-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Dashboard</h3>
              <p className="text-gray-600">
                Real-time visualizations of your business metrics with AI-powered insights.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="bg-nyc-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="text-nyc-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">HR & Payroll</h3>
              <p className="text-gray-600">
                Employee management, timesheets, and NYC-compliant payroll processing.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="bg-nyc-secondary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="text-nyc-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Calendar</h3>
              <p className="text-gray-600">
                Advanced scheduling with booking slots and automated reminders across time zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NYC-Specific Section */}
      <section className="bg-nyc-light py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="New York City Skyline" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-nyc-primary">
                Built For NYC Businesses
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-nyc-success mr-3 mt-1 flex-shrink-0" />
                  <span>NYC & NYS business incentive program integrations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-nyc-success mr-3 mt-1 flex-shrink-0" />
                  <span>MWBE certification guidance and application tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-nyc-success mr-3 mt-1 flex-shrink-0" />
                  <span>Local tax compliance calendar with NYC-specific deadlines</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-nyc-success mr-3 mt-1 flex-shrink-0" />
                  <span>NYC wage law compliance checks for HR & payroll</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-nyc-success mr-3 mt-1 flex-shrink-0" />
                  <span>Business license renewal alerts specific to your NYC industry</span>
                </li>
              </ul>
              <Button asChild className="mt-8 bg-nyc-primary hover:bg-nyc-primary/90">
                <Link to="/register">Get NYC-Ready <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-nyc-primary mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-gray-600">
                Get in touch with our team to schedule a demo or learn more about how we can help your NYC business thrive.
              </p>
            </div>
            
            <form className="space-y-6 bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="business" className="text-sm font-medium">Business Name</label>
                <Input id="business" placeholder="Your business name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea id="message" placeholder="Tell us about your business needs..." rows={4} />
              </div>
              <Button type="submit" className="w-full bg-nyc-secondary hover:bg-nyc-secondary/90">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowChat(!showChat)}
          className="bg-nyc-primary hover:bg-nyc-primary/90 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
      
      {/* AI Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700 animate-scale-in">
          <AIChat onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
