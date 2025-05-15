
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Menu, User } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample employee data
const employeeData = [
  { 
    id: 1,
    name: "John Smith",
    position: "Software Developer",
    department: "Engineering",
    email: "john@nycbizhub.com",
    dateHired: "2023-05-15",
    status: "Active" 
  },
  { 
    id: 2,
    name: "Sarah Johnson",
    position: "Marketing Manager",
    department: "Marketing",
    email: "sarah@nycbizhub.com",
    dateHired: "2022-11-08",
    status: "Active" 
  },
  { 
    id: 3,
    name: "Michael Chen",
    position: "Sales Representative",
    department: "Sales",
    email: "michael@nycbizhub.com",
    dateHired: "2023-02-20",
    status: "On Leave" 
  },
  { 
    id: 4,
    name: "Emily Davis",
    position: "HR Specialist",
    department: "Human Resources",
    email: "emily@nycbizhub.com",
    dateHired: "2022-07-12",
    status: "Active" 
  },
  { 
    id: 5,
    name: "David Wilson",
    position: "Financial Analyst",
    department: "Finance",
    email: "david@nycbizhub.com",
    dateHired: "2023-01-05",
    status: "Inactive" 
  }
];

// Sample time off requests
const timeOffRequests = [
  {
    id: 1,
    employee: "Sarah Johnson",
    type: "Vacation",
    startDate: "2025-06-10",
    endDate: "2025-06-17",
    status: "Pending"
  },
  {
    id: 2,
    employee: "Michael Chen",
    type: "Sick",
    startDate: "2025-05-18",
    endDate: "2025-05-20",
    status: "Approved"
  },
  {
    id: 3,
    employee: "John Smith",
    type: "Personal",
    startDate: "2025-07-05",
    endDate: "2025-07-05",
    status: "Pending"
  }
];

const HR: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
            Human Resources
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button size="sm">
              + Add Employee
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="timeoff">Time Off</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="employees" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <Input placeholder="Search employees..." className="w-full md:w-80" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button size="sm">+ Add Employee</Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Employee Directory</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date Hired</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employeeData.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{formatDate(employee.dateHired)}</TableCell>
                          <TableCell>
                            <CustomBadge variant={
                              employee.status === "Active" ? "success" :
                              employee.status === "On Leave" ? "warning" : 
                              "secondary"
                            }>
                              {employee.status}
                            </CustomBadge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Engineering', 'Marketing', 'Sales', 'Human Resources', 'Finance'].map(dept => (
                        <div key={dept} className="flex justify-between items-center">
                          <p className="text-gray-600">{dept}</p>
                          <CustomBadge variant="secondary">
                            {employeeData.filter(emp => emp.department === dept).length}
                          </CustomBadge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Active</p>
                        <CustomBadge variant="success">
                          {employeeData.filter(emp => emp.status === "Active").length}
                        </CustomBadge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">On Leave</p>
                        <CustomBadge variant="warning">
                          {employeeData.filter(emp => emp.status === "On Leave").length}
                        </CustomBadge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Inactive</p>
                        <CustomBadge variant="secondary">
                          {employeeData.filter(emp => emp.status === "Inactive").length}
                        </CustomBadge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Add New Employee
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" x2="16" y1="2" y2="6"></line>
                          <line x1="8" x2="8" y1="2" y2="6"></line>
                          <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                        Approve Time Off
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Run Payroll
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="timeoff" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <Input placeholder="Search requests..." className="w-full md:w-80" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button size="sm">+ New Request</Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Time Off Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeOffRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.employee}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>{formatDate(request.startDate)}</TableCell>
                          <TableCell>{formatDate(request.endDate)}</TableCell>
                          <TableCell>
                            <CustomBadge variant={
                              request.status === "Approved" ? "success" :
                              request.status === "Pending" ? "warning" : 
                              "destructive"
                            }>
                              {request.status}
                            </CustomBadge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {request.status === "Pending" && (
                                <>
                                  <Button variant="outline" size="sm" className="h-8 text-nyc-success border-nyc-success hover:bg-nyc-success/10">
                                    Approve
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-8 text-nyc-danger border-nyc-danger hover:bg-nyc-danger/10">
                                    Deny
                                  </Button>
                                </>
                              )}
                              {request.status !== "Pending" && (
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="onboarding" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Onboarding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Coming soon! Employee onboarding workflows and checklists.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>NYC Compliance Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Coming soon! NYC-specific compliance monitoring and alerts.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default HR;
