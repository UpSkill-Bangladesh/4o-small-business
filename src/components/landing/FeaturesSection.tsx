
import React, { useState } from 'react';
import { FileText, Layers, Users, BarChart, Clock, Calendar, Sparkles } from "lucide-react";

const FeaturesSection: React.FC = () => {
  // Add state to track hovered feature card
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  // Feature card data
  const features = [
    {
      icon: <FileText className="text-white" />,
      title: "NYC Business Setup",
      description: "Guided registration process, NYC-specific permits, licenses, and MWBE certifications.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <Layers className="text-white" />,
      title: "Complete ERP System",
      description: "Inventory, procurement, expenses, and vendor management all in one place.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="text-white" />,
      title: "CRM & Lead Management",
      description: "Customer pipeline, lead scoring, and automated follow-ups to grow your business.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart className="text-white" />,
      title: "Smart Dashboard",
      description: "Real-time visualizations of your business metrics with AI-powered insights.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Clock className="text-white" />,
      title: "HR & Payroll",
      description: "Employee management, timesheets, and NYC-compliant payroll processing.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Calendar className="text-white" />,
      title: "Smart Calendar",
      description: "Advanced scheduling with booking slots and automated reminders across time zones.",
      gradient: "from-amber-500 to-yellow-500"
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900" id="features">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <Sparkles className="text-blue-500 dark:text-blue-400 mr-2 h-4 w-4" />
            <span className="text-blue-700 dark:text-blue-300 text-sm font-medium">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            Everything Your NYC Business Needs
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From business registration to daily operations, NYC-specific compliance to financial planning, we have you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-lift card-hover-glow transition-all duration-500"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`h-2 bg-gradient-to-r ${feature.gradient} transition-all duration-500 ${hoveredFeature === index ? 'h-3' : ''}`}></div>
              <div className="p-6">
                <div className={`bg-gradient-to-r ${feature.gradient} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transform transition-transform duration-500 ${hoveredFeature === index ? 'scale-110 rotate-3' : ''}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
