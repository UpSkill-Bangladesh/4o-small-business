
import React, { useState } from 'react';
import { Menu, Moon, Sun, FileText, DollarSign, Calendar, Activity, BarChart2, PieChart } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import RequireAuth from '@/components/auth/RequireAuth';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import {
  BarChart,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  Bar,
  Pie,
  PieChart as RechartsPieChart,
  Cell
} from "recharts";

// Mock data
const revenueData = [
  { month: "Jan", revenue: 12500, expenses: 8500, profit: 4000 },
  { month: "Feb", revenue: 14200, expenses: 9200, profit: 5000 },
  { month: "Mar", revenue: 16800, expenses: 10100, profit: 6700 },
  { month: "Apr", revenue: 15900, expenses: 9800, profit: 6100 },
  { month: "May", revenue: 17500, expenses: 10500, profit: 7000 },
];

const customerSatisfactionData = [
  { name: "Very Satisfied", value: 54 },
  { name: "Satisfied", value: 28 },
  { name: "Neutral", value: 12 },
  { name: "Unsatisfied", value: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "submitted a new proposal",
    time: "2 hours ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    user: "Sarah Smith",
    action: "closed a deal with XYZ Corp",
    time: "4 hours ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "updated client information",
    time: "Yesterday",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "scheduled a meeting with ABC Inc",
    time: "Yesterday",
    avatar: "/placeholder.svg"
  }
];

const upcomingTasks = [
  {
    id: 1,
    title: "Client Meeting - Johnson & Co.",
    date: "Tomorrow, 10:00 AM",
    priority: "high"
  },
  {
    id: 2,
    title: "Quarterly Report Submission",
    date: "May 20, 2025",
    priority: "medium"
  },
  {
    id: 3,
    title: "Team Performance Review",
    date: "May 22, 2025",
    priority: "low"
  },
  {
    id: 4,
    title: "Software Update Deployment",
    date: "May 25, 2025",
    priority: "high"
  }
];

const recentDocuments = [
  {
    id: 1,
    title: "Q1 Financial Report.pdf",
    updatedAt: "May 15, 2025",
    size: "2.4 MB",
    type: "pdf"
  },
  {
    id: 2,
    title: "Marketing Strategy 2025.docx",
    updatedAt: "May 14, 2025",
    size: "1.8 MB",
    type: "word"
  },
  {
    id: 3,
    title: "Client Presentation.pptx",
    updatedAt: "May 12, 2025",
    size: "4.2 MB",
    type: "powerpoint"
  },
  {
    id: 4,
    title: "Project Timeline.xlsx",
    updatedAt: "May 10, 2025",
    size: "1.1 MB",
    type: "excel"
  }
];

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <RequireAuth>
      <div className="flex h-screen bg-background">
        {!isMobile && <Sidebar />}
        {isMobile && (
          <Sidebar
            isMobile={true}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-card border-b border-border py-4 px-6 flex justify-between items-center">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-foreground focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-semibold text-nyc-primary">
              Overview
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch 
                  checked={theme === "dark"}
                  onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
                />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Welcome{userProfile?.first_name ? `, ${userProfile?.first_name}` : ''}!
              </h2>
              <p className="text-muted-foreground">
                Here's an overview of your business activities
              </p>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <h3 className="text-2xl font-bold text-foreground">{formatCurrency(76900)}</h3>
                      <div className="flex items-center mt-1 text-nyc-success text-sm">
                        <span>↑ 12% from last month</span>
                      </div>
                    </div>
                    <div className="bg-nyc-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-nyc-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Customers</p>
                      <h3 className="text-2xl font-bold text-foreground">245</h3>
                      <div className="flex items-center mt-1 text-nyc-success text-sm">
                        <span>↑ 8% from last month</span>
                      </div>
                    </div>
                    <div className="bg-nyc-secondary/10 p-3 rounded-full">
                      <Activity className="h-6 w-6 text-nyc-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Tasks</p>
                      <h3 className="text-2xl font-bold text-foreground">18</h3>
                      <div className="flex items-center mt-1 text-nyc-warning text-sm">
                        <span>5 high priority</span>
                      </div>
                    </div>
                    <div className="bg-nyc-tertiary/10 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-nyc-tertiary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Recent Documents</p>
                      <h3 className="text-2xl font-bold text-foreground">12</h3>
                      <div className="text-muted-foreground text-sm mt-1">
                        <span>Updated today</span>
                      </div>
                    </div>
                    <div className="bg-nyc-accent/10 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-nyc-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>Revenue, expenses, and profit over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue" fill="#0F4C81" />
                        <Bar dataKey="expenses" name="Expenses" fill="#E74C3C" />
                        <Bar dataKey="profit" name="Profit" fill="#2ECC71" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                  <CardDescription>Overall customer feedback analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={customerSatisfactionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {customerSatisfactionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 animate-fade-in">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={activity.avatar} alt={activity.user} />
                          <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Monthly Revenue</span>
                        <span className="text-sm font-semibold">{formatCurrency(17500)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-nyc-primary h-full w-[85%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Monthly Expenses</span>
                        <span className="text-sm font-semibold">{formatCurrency(10500)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-nyc-danger h-full w-[60%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Monthly Profit</span>
                        <span className="text-sm font-semibold">{formatCurrency(7000)}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-nyc-success h-full w-[40%]" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button size="sm" variant="outline" className="w-full">View Detailed Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between animate-fade-in">
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">{task.date}</p>
                        </div>
                        <Badge variant={
                          task.priority === 'high' ? "destructive" :
                          task.priority === 'medium' ? "default" : "secondary"
                        }>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Button size="sm" variant="outline" className="w-full">View All Tasks</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-start p-3 rounded-md border hover:bg-accent/10 transition-colors cursor-pointer animate-fade-in">
                      <div className="p-2 rounded-md bg-nyc-primary/10 mr-3">
                        <FileText className="h-5 w-5 text-nyc-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{doc.updatedAt}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button size="sm" variant="outline" className="w-full">View All Documents</Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Dashboard;
