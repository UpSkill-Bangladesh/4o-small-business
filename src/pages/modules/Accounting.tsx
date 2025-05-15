
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Line,
  Bar
} from "recharts";
import { Calendar, FileText, Menu, Clock, ArrowRight } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data
const incomeData = [
  { month: "Jan", amount: 12500 },
  { month: "Feb", amount: 14200 },
  { month: "Mar", amount: 16800 },
  { month: "Apr", amount: 15900 },
  { month: "May", amount: 17500 },
];

const expenseData = [
  { month: "Jan", amount: 8500 },
  { month: "Feb", amount: 9200 },
  { month: "Mar", amount: 10100 },
  { month: "Apr", amount: 9800 },
  { month: "May", amount: 10500 },
];

const taxDeadlines = [
  {
    id: 1,
    title: "Quarterly Federal Tax Payment",
    deadline: "2025-06-15",
    type: "federal",
    completed: false
  },
  {
    id: 2,
    title: "NYS Sales Tax Filing",
    deadline: "2025-05-20",
    type: "state",
    completed: false
  },
  {
    id: 3,
    title: "NYC Commercial Rent Tax",
    deadline: "2025-06-20",
    type: "city",
    completed: false
  },
  {
    id: 4,
    title: "Quarterly Payroll Tax Return",
    deadline: "2025-07-31",
    type: "federal",
    completed: false
  }
];

const recentTransactions = [
  {
    id: 1,
    description: "Software Subscription",
    date: "2025-05-13",
    amount: -129.99,
    category: "Software"
  },
  {
    id: 2,
    description: "Client Payment - ABC Corp",
    date: "2025-05-12",
    amount: 1500.00,
    category: "Income"
  },
  {
    id: 3,
    description: "Office Supplies",
    date: "2025-05-10",
    amount: -78.45,
    category: "Office"
  },
  {
    id: 4,
    description: "Client Payment - XYZ Inc",
    date: "2025-05-08",
    amount: 2750.00,
    category: "Income"
  }
];

const Accounting: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const getDeadlineStatus = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "overdue";
    if (diffDays <= 7) return "soon";
    return "upcoming";
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
            Accounting & Tax
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
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
          
          {/* Income & Expense Section */}
          <div className="mt-8">
            <Tabs defaultValue="income-expense" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="income-expense">Income & Expenses</TabsTrigger>
                  <TabsTrigger value="tax-deadlines">Tax Deadlines</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="income-expense" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Income vs Expenses (2025)</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={incomeData.map((item, index) => ({
                            month: item.month,
                            income: item.amount,
                            expenses: expenseData[index].amount
                          }))}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="income" name="Income" fill="#3A8DDE" />
                          <Bar dataKey="expenses" name="Expenses" fill="#FF6B6B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.description}</TableCell>
                              <TableCell>{formatDate(transaction.date)}</TableCell>
                              <TableCell className={transaction.amount > 0 ? "text-nyc-success" : "text-nyc-danger"}>
                                {formatCurrency(transaction.amount)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View All Transactions
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[
                              { category: "Office", amount: 1200 },
                              { category: "Software", amount: 1800 },
                              { category: "Marketing", amount: 2500 },
                              { category: "Utilities", amount: 800 },
                              { category: "Payroll", amount: 5200 },
                            ]}
                          >
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="amount" stroke="#0F4C81" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="tax-deadlines" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tax Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {taxDeadlines.map((deadline) => (
                        <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-md">
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 rounded-full ${
                              deadline.type === 'federal' ? 'bg-blue-100' :
                              deadline.type === 'state' ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                              <Calendar className={`h-5 w-5 ${
                                deadline.type === 'federal' ? 'text-blue-600' :
                                deadline.type === 'state' ? 'text-green-600' : 'text-yellow-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-medium">{deadline.title}</h4>
                              <p className="text-sm text-gray-500">Due: {formatDate(deadline.deadline)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              getDeadlineStatus(deadline.deadline) === "overdue" ? "destructive" :
                              getDeadlineStatus(deadline.deadline) === "soon" ? "outline" : "secondary"
                            }>
                              {getDeadlineStatus(deadline.deadline) === "overdue" ? "Overdue" :
                               getDeadlineStatus(deadline.deadline) === "soon" ? "Due Soon" : "Upcoming"}
                            </Badge>
                            <Button variant="outline" size="sm">Prepare</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Annual Checklist</h3>
                      <div className="space-y-2">
                        <div className="flex items-center p-3 border rounded-md">
                          <input type="checkbox" id="w2" className="mr-3" />
                          <label htmlFor="w2" className="text-sm">W-2 Forms (Deadline: January 31)</label>
                        </div>
                        <div className="flex items-center p-3 border rounded-md">
                          <input type="checkbox" id="1099" className="mr-3" />
                          <label htmlFor="1099" className="text-sm">1099 Forms (Deadline: January 31)</label>
                        </div>
                        <div className="flex items-center p-3 border rounded-md">
                          <input type="checkbox" id="annualReturn" className="mr-3" />
                          <label htmlFor="annualReturn" className="text-sm">Annual Tax Return (Deadline: April 15)</label>
                        </div>
                        <div className="flex items-center p-3 border rounded-md">
                          <input type="checkbox" id="annualReport" className="mr-3" />
                          <label htmlFor="annualReport" className="text-sm">Annual Report Filing (Deadline: Varies by state)</label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <FileText className="h-8 w-8 text-nyc-primary" />
                              <div>
                                <h3 className="font-medium">Income Statement</h3>
                                <p className="text-sm text-gray-500">Year-to-date financial report</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Generate</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <FileText className="h-8 w-8 text-nyc-secondary" />
                              <div>
                                <h3 className="font-medium">Balance Sheet</h3>
                                <p className="text-sm text-gray-500">Current financial position</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Generate</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <FileText className="h-8 w-8 text-nyc-tertiary" />
                              <div>
                                <h3 className="font-medium">Sales Tax Report</h3>
                                <p className="text-sm text-gray-500">Quarterly sales tax summary</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Generate</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <FileText className="h-8 w-8 text-nyc-warning" />
                              <div>
                                <h3 className="font-medium">1099 Summary</h3>
                                <p className="text-sm text-gray-500">Contractor payment report</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Generate</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <FileText className="h-8 w-8 text-nyc-success" />
                              <div>
                                <h3 className="font-medium">W-2 Forms</h3>
                                <p className="text-sm text-gray-500">Employee wage reports</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Generate</Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border shadow-none">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <FileText className="h-8 w-8 text-nyc-danger" />
                              <div>
                                <h3 className="font-medium">Expense Report</h3>
                                <p className="text-sm text-gray-500">Categorized expense summary</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">Generate</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Accounting;
