
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building2, Award } from "lucide-react";

const NYCSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const nycFeatures = [
    {
      icon: <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />,
      text: "NYC & NYS business incentive program integrations"
    },
    {
      icon: <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />,
      text: "MWBE certification guidance and application tracking"
    },
    {
      icon: <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />,
      text: "Local tax compliance calendar with NYC-specific deadlines"
    },
    {
      icon: <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />,
      text: "NYC wage law compliance checks for HR & payroll"
    },
    {
      icon: <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />,
      text: "Business license renewal alerts specific to your NYC industry"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="New York City Skyline" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              
              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-lg flex items-center space-x-2 float-animation">
                <Award className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">NYC Certified</span>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm flex items-center space-x-2">
                <Building2 className="h-5 w-5 mr-2" />
                <span className="font-medium">NYC Small Business Capital</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Building2 className="text-blue-500 dark:text-blue-400 mr-2 h-4 w-4" />
              <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">NYC-Specific</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              Built For NYC Businesses
            </h2>
            
            <ul className="space-y-5">
              {nycFeatures.map((feature, index) => (
                <li 
                  key={index} 
                  className={`flex items-start p-3 rounded-lg transition-all duration-300 ${hoveredItem === index ? 'bg-white dark:bg-gray-800 shadow-md transform -translate-y-1' : ''}`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {feature.icon}
                  <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              asChild 
              className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
            >
              <Link to="/register" className="flex items-center">
                Get NYC-Ready 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NYCSection;
