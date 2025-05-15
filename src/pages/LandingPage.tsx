
import React, { useState } from 'react';
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

const LandingPage: React.FC = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-nyc-primary to-nyc-secondary text-white py-24 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                NYC's Complete Business Management Platform
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Everything you need to start, run and grow your NYC business - all in one place.
                From city permits to taxes, sales to HR, backed by AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-nyc-primary hover:bg-gray-100">
                  <Link to="/register">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link to="#demo">Watch Demo</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://www.nyc.gov/assets/home/images/content/pages/highlights/highlight-business.jpg" 
                alt="NYC Business Dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
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
          className="bg-nyc-primary hover:bg-nyc-primary/90 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
      
      {/* AI Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
          <AIChat onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
