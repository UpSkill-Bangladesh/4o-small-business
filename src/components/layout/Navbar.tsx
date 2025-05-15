
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-nyc-primary">NYC</span>
            <span className="text-2xl font-bold text-nyc-secondary ml-1">BizHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/#features" className="text-gray-700 hover:text-nyc-primary transition-colors">Features</Link>
            <Link to="/#pricing" className="text-gray-700 hover:text-nyc-primary transition-colors">Pricing</Link>
            <Link to="/#about" className="text-gray-700 hover:text-nyc-primary transition-colors">About</Link>
            <Link to="/login" className="text-gray-700 hover:text-nyc-primary transition-colors">Login</Link>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-md focus:outline-none"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/#features" 
                className="text-gray-700 hover:text-nyc-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/#pricing" 
                className="text-gray-700 hover:text-nyc-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/#about" 
                className="text-gray-700 hover:text-nyc-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-nyc-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Button asChild>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
