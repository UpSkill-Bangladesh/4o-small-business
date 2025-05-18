
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const NYCSection: React.FC = () => {
  return (
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
  );
};

export default NYCSection;
