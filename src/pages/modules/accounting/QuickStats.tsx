
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar } from "lucide-react";
import { formatCurrency } from './utils/formatters';

const QuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Income</p>
              <h3 className="text-2xl font-bold">{formatCurrency(17500)}</h3>
              <div className="flex items-center mt-1 text-nyc-success text-sm">
                <span>↑ 8% from April</span>
              </div>
            </div>
            <div className="bg-nyc-primary/10 p-3 rounded-full">
              <BarChart className="h-6 w-6 text-nyc-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Expenses</p>
              <h3 className="text-2xl font-bold">{formatCurrency(10500)}</h3>
              <div className="flex items-center mt-1 text-nyc-danger text-sm">
                <span>↑ 7% from April</span>
              </div>
            </div>
            <div className="bg-nyc-danger/10 p-3 rounded-full">
              <BarChart className="h-6 w-6 text-nyc-danger" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Net Profit</p>
              <h3 className="text-2xl font-bold">{formatCurrency(7000)}</h3>
              <div className="flex items-center mt-1 text-nyc-success text-sm">
                <span>↑ 10% from April</span>
              </div>
            </div>
            <div className="bg-nyc-success/10 p-3 rounded-full">
              <BarChart className="h-6 w-6 text-nyc-success" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Tax Deadlines</p>
              <h3 className="text-2xl font-bold">4</h3>
              <div className="text-gray-500 text-sm mt-1">
                <span>2 due this month</span>
              </div>
            </div>
            <div className="bg-nyc-warning/10 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-nyc-warning" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
