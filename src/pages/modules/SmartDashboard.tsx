
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  LineChart, 
  PieChart,
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Legend,
  Line,
  Bar,
  Pie,
  Cell
} from "recharts";
import { Calendar, Menu, BarChart2, FileText, Settings, Sliders } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data
const revenueData = [
  { name: "Jan", actual: 12500, projected: 12000 },
  { name: "Feb", actual: 14200, projected: 13000 },
  { name: "Mar", actual: 16800, projected: 15000 },
  { name: "Apr", actual: 15900, projected: 16000 },
  { name: "May", actual: 17500, projected: 17000 },
];

const expenseData = [
  { name: "Jan", actual: 8500, projected: 9000 },
  { name: "Feb", actual: 9200, projected: 9500 },
  { name: "Mar", actual: 10100, projected: 10000 },
  { name: "Apr", actual: 9800, projected: 10500 },
  { name: "May", actual: 10500, projected: 11000 },
];

const employeeStatusData = [
  { name: "Active", value: 12 },
  { name: "PTO", value: 2 },
  { name: "Remote", value: 5 },
  { name: "Offboarding", value: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const salesByDepartmentData = [
  { department: "Products", sales: 28500 },
  { department: "Services", sales: 42300 },
  { department: "Consulting", sales: 31200 },
  { department: "Training", sales: 14800 },
];

const aiSuggestions = [
  {
    id: 1,
    title: "Reduce Software Expenses",
    description: "Consolidating similar software tools could save up to $450/month.",
    impact: "high",
    type: "cost"
  },
  {
    id: 2,
    title: "Focus on Consulting Services",
    description: "Your highest profit margin is in consulting. Consider allocating more resources.",
    impact: "medium",
    type: "profit"
  },
  {
    id: 3,
    title: "Employee Utilization Optimization",
    description: "Two employees are consistently under 65% utilization. Consider reassigning tasks.",
    impact: "medium",
    type: "efficiency"
  },
  {
    id: 4,
    title: "Inventory Reduction",
    description: "Certain product lines have slow turnover. Consider reducing stock by 15%.",
    impact: "high",
    type: "cost"
  }
];

const SmartDashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && <Sidebar />}
      {isMobile && (
        <Sidebar
          isMobile={true}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          
          <h1 className="text-xl md:text-2xl font-semibold text-nyc-primary">
            Smart Dashboard
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Sliders className="h-4 w-4 mr-2" />
              Customize
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="bg-white rounded-lg p-4 mb-6 border">
            <div className="flex flex-wrap justify-between items-center">
              <div className="space-x-2 mb-2 sm:mb-0">
                <Button 
                  variant={dateFilter === 'week' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setDateFilter('week')}
                >
                  Week
                </Button>
                <Button 
                  variant={dateFilter === 'month' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setDateFilter('month')}
                >
                  Month
                </Button>
                <Button 
                  variant={dateFilter === 'quarter' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setDateFilter('quarter')}
                >
                  Quarter
                </Button>
                <Button 
                  variant={dateFilter === 'year' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setDateFilter('year')}
                >
                  Year
                </Button>
              </div>
              <div className="flex space-x-2">
                <select className="text-sm border rounded-md px-3 py-1">
                  <option>All Departments</option>
                  <option>Products</option>
                  <option>Services</option>
                  <option>Consulting</option>
                  <option>Training</option>
                </select>
                <select className="text-sm border rounded-md px-3 py-1">
                  <option>All Projects</option>
                  <option>Website Redesign</option>
                  <option>Mobile App</option>
                  <option>Cloud Migration</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold">{formatCurrency(76900)}</h3>
                    <div className="flex items-center mt-1 text-nyc-success text-sm">
                      <span>↑ 12% projected</span>
                    </div>
                  </div>
                  <div className="bg-nyc-primary/10 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-nyc-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <h3 className="text-2xl font-bold">{formatCurrency(48100)}</h3>
                    <div className="flex items-center mt-1 text-nyc-danger text-sm">
                      <span>↓ 5% projected</span>
                    </div>
                  </div>
                  <div className="bg-nyc-danger/10 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-nyc-danger" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Net Profit</p>
                    <h3 className="text-2xl font-bold">{formatCurrency(28800)}</h3>
                    <div className="flex items-center mt-1 text-nyc-success text-sm">
                      <span>↑ 18% projected</span>
                    </div>
                  </div>
                  <div className="bg-nyc-success/10 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-nyc-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Employees</p>
                    <h3 className="text-2xl font-bold">20</h3>
                    <div className="text-gray-500 text-sm mt-1">
                      <span>5 remote today</span>
                    </div>
                  </div>
                  <div className="bg-nyc-tertiary/10 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-nyc-tertiary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Revenue vs Projected</CardTitle>
                <CardDescription>
                  Comparing actual revenue with projections
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#3A8DDE"
                        strokeWidth={2}
                        name="Actual Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="projected"
                        stroke="#8884d8"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Projected Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Expenses vs Projected</CardTitle>
                <CardDescription>
                  Comparing actual expenses with projections
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={expenseData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#FF6B6B"
                        strokeWidth={2}
                        name="Actual Expenses"
                      />
                      <Line
                        type="monotone"
                        dataKey="projected"
                        stroke="#ff9999"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Projected Expenses"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Sales by Department</CardTitle>
                <CardDescription>
                  Revenue breakdown by department
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByDepartmentData}>
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="sales" fill="#6E59A5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Employee Status</CardTitle>
                <CardDescription>
                  Current employee availability
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={employeeStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {employeeStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} employees`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* AI Suggestions */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">AI Insights & Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiSuggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg mb-2">{suggestion.title}</h3>
                      <Badge variant={
                        suggestion.impact === 'high' ? "destructive" :
                        suggestion.impact === 'medium' ? "default" : "secondary"
                      }>
                        {suggestion.impact} impact
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{suggestion.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant={
                        suggestion.type === 'cost' ? "outline" :
                        suggestion.type === 'profit' ? "default" : "secondary"
                      }>
                        {suggestion.type}
                      </Badge>
                      <Button size="sm" variant="outline">
                        See Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SmartDashboard;
