
import React, { useState } from 'react';
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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth" className="text-gray-700 hover:text-nyc-primary transition-colors">Login</Link>
                <Button asChild>
                  <Link to="/auth?tab=register">Get Started</Link>
                </Button>
              </>
            )}
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
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-nyc-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-nyc-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start px-0"
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
                    className="text-gray-700 hover:text-nyc-primary transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Button asChild>
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
