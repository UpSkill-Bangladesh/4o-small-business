
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, BarChart2, Calendar, Clock, Menu, Users } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for charts
const salesData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 4100 },
  { name: "May", total: 4800 },
  { name: "Jun", total: 3700 },
  { name: "Jul", total: 4500 },
];

const expensesData = [
  { name: "Jan", total: 900 },
  { name: "Feb", total: 1100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2000 },
  { name: "May", total: 2200 },
  { name: "Jun", total: 1900 },
  { name: "Jul", total: 2100 },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Client Meeting - Acme Corp",
    date: "2025-05-16T14:00:00",
    type: "meeting",
  },
  {
    id: 2,
    title: "Sales Tax Filing Deadline",
    date: "2025-05-20T00:00:00",
    type: "deadline",
  },
  {
    id: 3,
    title: "Team Weekly Sync",
    date: "2025-05-16T10:00:00",
    type: "meeting",
  },
  {
    id: 4,
    title: "Follow-up with Prospect",
    date: "2025-05-17T13:30:00",
    type: "task",
  },
];

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };
  
  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
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
            {isMobile ? "Dashboard" : "Welcome, John!"}
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              May 15, 2025
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Revenue (MTD)</p>
                    <h3 className="text-2xl font-bold">$24,500</h3>
                    <div className="flex items-center mt-1 text-nyc-success text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>12% from April</span>
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
                    <p className="text-sm text-gray-500">New Customers</p>
                    <h3 className="text-2xl font-bold">17</h3>
                    <div className="flex items-center mt-1 text-nyc-success text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>8% from April</span>
                    </div>
                  </div>
                  <div className="bg-nyc-secondary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-nyc-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Order Value</p>
                    <h3 className="text-2xl font-bold">$284</h3>
                    <div className="flex items-center mt-1 text-nyc-success text-sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>5% from April</span>
                    </div>
                  </div>
                  <div className="bg-nyc-tertiary/10 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-nyc-tertiary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Open Tasks</p>
                    <h3 className="text-2xl font-bold">12</h3>
                    <div className="text-gray-500 text-sm mt-1">
                      <span>4 due today</span>
                    </div>
                  </div>
                  <div className="bg-nyc-warning/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-nyc-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts Section */}
          <div className="mt-8">
            <Tabs defaultValue="revenue" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="customers">Customers</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" size="sm">
                  Last 7 Months
                </Button>
              </div>
              
              <TabsContent value="revenue" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      Monthly revenue performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                          <XAxis 
                            dataKey="name" 
                            stroke="#888888" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip />
                          <Bar dataKey="total" fill="#3A8DDE" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="expenses" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Expense Trends</CardTitle>
                    <CardDescription>
                      Monthly expense tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={expensesData}>
                          <XAxis 
                            dataKey="name" 
                            stroke="#888888" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#0F4C81" 
                            strokeWidth={2} 
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="customers" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Customer Growth</CardTitle>
                    <CardDescription>
                      New customers by month
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: "Jan", total: 6 },
                          { name: "Feb", total: 9 },
                          { name: "Mar", total: 12 },
                          { name: "Apr", total: 15 },
                          { name: "May", total: 18 },
                          { name: "Jun", total: 16 },
                          { name: "Jul", total: 17 },
                        ]}>
                          <XAxis 
                            dataKey="name" 
                            stroke="#888888" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                          />
                          <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip />
                          <Bar dataKey="total" fill="#5ACBF0" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Calendar & Upcoming Events */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <Card>
              <CardContent className="p-6">
                <div className="divide-y">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="pt-1">
                            <div className="bg-nyc-light p-2 rounded-md">
                              {event.type === "meeting" && (
                                <Users className="h-5 w-5 text-nyc-primary" />
                              )}
                              {event.type === "deadline" && (
                                <Clock className="h-5 w-5 text-nyc-danger" />
                              )}
                              {event.type === "task" && (
                                <Calendar className="h-5 w-5 text-nyc-secondary" />
                              )}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center space-x-2 mt-1 text-gray-500 text-sm">
                              <span>
                                {isToday(event.date) ? "Today" : formatDate(event.date)}
                              </span>
                              <span>•</span>
                              <span>{formatTime(event.date)}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={
                          event.type === "deadline" ? "destructive" :
                          event.type === "meeting" ? "default" :
                          "secondary"
                        }>
                          {event.type === "deadline" ? "Deadline" : 
                           event.type === "meeting" ? "Meeting" : "Task"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
