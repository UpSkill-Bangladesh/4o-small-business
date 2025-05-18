
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md ${
      scrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo with animated gradient */}
          <Link to="/" className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">NYC</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text ml-1">BizHub</span>
            </div>
          </Link>
          
          {/* Desktop Navigation with hover effects */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/#features" 
              className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors relative link-underline"
            >
              Features
            </Link>
            <Link 
              to="/#pricing" 
              className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors relative link-underline"
            >
              Pricing
            </Link>
            <Link 
              to="/#about" 
              className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors relative link-underline"
            >
              About
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative rounded-full h-10 w-10 p-0 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 hover:from-purple-500 hover:to-blue-400 text-white transition-all duration-300"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="hover-scale">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="hover-scale">
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="hover-scale">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors relative link-underline"
                >
                  Login
                </Link>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white border-none hover-scale shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to="/auth?tab=register">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
          
          {/* Mobile menu button with animation */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 rounded-md focus:outline-none bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="animate-spin-once" /> : <Menu className="animate-pulse" />}
          </button>
        </div>
        
        {/* Mobile Navigation with animation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <Link 
                to="/#features" 
                className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors py-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/#pricing" 
                className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors py-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/#about" 
                className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors py-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors py-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors py-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/auth" 
                    className="text-gray-700 dark:text-gray-300 hover:text-nyc-primary transition-colors py-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Button 
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white border-none hover-scale"
                  >
                    <Link to="/auth?tab=register" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
