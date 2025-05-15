
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Menu, User } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample lead data
const leadData = [
  { 
    id: 1, 
    name: "Jane Smith", 
    company: "ABC Corporation", 
    email: "jane@abccorp.com", 
    phone: "(212) 555-1234", 
    status: "New", 
    score: 85 
  },
  { 
    id: 2, 
    name: "Robert Johnson", 
    company: "XYZ Industries", 
    email: "robert@xyzindustries.com", 
    phone: "(917) 555-5678", 
    status: "Contacted", 
    score: 72 
  },
  { 
    id: 3, 
    name: "Emily Davis", 
    company: "Acme Co", 
    email: "emily@acmeco.com", 
    phone: "(646) 555-8765", 
    status: "Qualified", 
    score: 94 
  },
  { 
    id: 4, 
    name: "Michael Brown", 
    company: "Metro Solutions", 
    email: "michael@metrosolutions.com", 
    phone: "(347) 555-4321", 
    status: "Negotiation", 
    score: 68 
  },
  { 
    id: 5, 
    name: "Sarah Wilson", 
    company: "City Services", 
    email: "sarah@cityservices.com", 
    phone: "(718) 555-9876", 
    status: "Lost", 
    score: 45 
  },
];

// Sample customer data
const customerData = [
  { 
    id: 1, 
    name: "David Miller", 
    company: "Brooklyn Designs", 
    email: "david@brooklyndesigns.com", 
    phone: "(718) 555-1122", 
    status: "Active", 
    value: 2500 
  },
  { 
    id: 2, 
    name: "Lisa Chen", 
    company: "Manhattan Media", 
    email: "lisa@manhattanmedia.com", 
    phone: "(212) 555-3344", 
    status: "Active", 
    value: 5800 
  },
  { 
    id: 3, 
    name: "James Wilson", 
    company: "Queens Catering", 
    email: "james@queenscatering.com", 
    phone: "(347) 555-5566", 
    status: "Inactive", 
    value: 1200 
  },
  { 
    id: 4, 
    name: "Sophia Garcia", 
    company: "Bronx Builders", 
    email: "sophia@bronxbuilders.com", 
    phone: "(718) 555-7788", 
    status: "Active", 
    value: 4200 
  },
];

const CRM: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
            Customer Relationship Management
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button size="sm">
              + New Contact
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="leads" className="space-y-6">
            <TabsList>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leads" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <Input placeholder="Search leads..." className="w-full md:w-80" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Import
                  </Button>
                  <Button size="sm">+ Add Lead</Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Lead Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>AI Score</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leadData.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.company}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>
                            <CustomBadge variant={
                              lead.status === "New" ? "default" :
                              lead.status === "Contacted" ? "secondary" :
                              lead.status === "Qualified" ? "success" :
                              lead.status === "Negotiation" ? "warning" : 
                              "destructive"
                            }>
                              {lead.status}
                            </CustomBadge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`w-10 h-2 rounded-full mr-2 ${
                                lead.score >= 80 ? "bg-nyc-success" :
                                lead.score >= 60 ? "bg-nyc-warning" : 
                                "bg-nyc-danger"
                              }`}></div>
                              <span>{lead.score}</span>
                            </div>
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
                    <CardTitle>Lead Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">New</p>
                        <CustomBadge variant="default">
                          {leadData.filter(lead => lead.status === "New").length}
                        </CustomBadge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Contacted</p>
                        <CustomBadge variant="secondary">
                          {leadData.filter(lead => lead.status === "Contacted").length}
                        </CustomBadge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Qualified</p>
                        <CustomBadge variant="success">
                          {leadData.filter(lead => lead.status === "Qualified").length}
                        </CustomBadge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Negotiation</p>
                        <CustomBadge variant="warning">
                          {leadData.filter(lead => lead.status === "Negotiation").length}
                        </CustomBadge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Lost</p>
                        <CustomBadge variant="destructive">
                          {leadData.filter(lead => lead.status === "Lost").length}
                        </CustomBadge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader>
                    <CardTitle>Top Leads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leadData
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3)
                        .map(lead => (
                          <div key={lead.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="bg-nyc-primary/10 p-2 rounded-full mr-3">
                                <User className="h-5 w-5 text-nyc-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{lead.name}</p>
                                <p className="text-sm text-gray-500">{lead.company}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm ${
                                lead.score >= 80 ? "text-nyc-success" :
                                lead.score >= 60 ? "text-nyc-warning" : 
                                "text-nyc-danger"
                              } font-medium`}>
                                {lead.score}% Match
                              </div>
                              <p className="text-xs text-gray-500">AI Score</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <Input placeholder="Search customers..." className="w-full md:w-80" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button size="sm">+ Add Customer</Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Customer Directory</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Customer Value</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerData.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="font-medium">{customer.name}</TableCell>
                          <TableCell>{customer.company}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>
                            <CustomBadge variant={customer.status === "Active" ? "success" : "secondary"}>
                              {customer.status}
                            </CustomBadge>
                          </TableCell>
                          <TableCell>${customer.value.toLocaleString()}</TableCell>
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
            </TabsContent>
            
            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Coming soon! Create and track email and social media campaigns.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>CRM Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Coming soon! In-depth customer analytics and insights.
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

export default CRM;
