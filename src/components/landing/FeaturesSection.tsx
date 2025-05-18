
import React from 'react';
import { FileText, Layers, Users, BarChart, Clock, Calendar } from "lucide-react";

const FeaturesSection: React.FC = () => {
  return (
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
  );
};

export default FeaturesSection;
