
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample inventory data
const inventoryData = [
  { id: 1, name: "Product A", sku: "PA-001", category: "Electronics", quantity: 45, status: "In Stock" },
  { id: 2, name: "Product B", sku: "PB-002", category: "Office Supplies", quantity: 20, status: "Low Stock" },
  { id: 3, name: "Product C", sku: "PC-003", category: "Electronics", quantity: 30, status: "In Stock" },
  { id: 4, name: "Product D", sku: "PD-004", category: "Furniture", quantity: 10, status: "Low Stock" },
  { id: 5, name: "Product E", sku: "PE-005", category: "Office Supplies", quantity: 0, status: "Out of Stock" },
];

// Sample vendor data
const vendorData = [
  { id: 1, name: "ABC Supplies", contact: "John Smith", email: "john@abcsupplies.com", category: "Electronics", status: "Active" },
  { id: 2, name: "Office Max", contact: "Jane Doe", email: "jane@officemax.com", category: "Office Supplies", status: "Active" },
  { id: 3, name: "Furniture Inc", contact: "Robert Brown", email: "robert@furnitureinc.com", category: "Furniture", status: "Inactive" },
  { id: 4, name: "Tech Solutions", contact: "Mary Johnson", email: "mary@techsolutions.com", category: "Electronics", status: "Active" },
];

const ERP: React.FC = () => {
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
            ERP System
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button size="sm">
              + Add New
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="inventory" className="space-y-6">
            <TabsList>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="procurement">Procurement</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <Input placeholder="Search inventory..." className="w-full md:w-80" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button size="sm">+ Add Item</Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Inventory Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.sku}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            <Badge variant={
                              item.status === "In Stock" ? "default" :
                              item.status === "Low Stock" ? "warning" : 
                              "destructive"
                            }>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Low Stock Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inventoryData
                        .filter(item => item.status === "Low Stock" || item.status === "Out of Stock")
                        .map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                            </div>
                            <Badge variant={item.status === "Low Stock" ? "warning" : "destructive"}>
                              {item.quantity} left
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Total Items</p>
                        <p className="font-semibold">{inventoryData.length}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">In Stock</p>
                        <p className="font-semibold">
                          {inventoryData.filter(item => item.status === "In Stock").length}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Low Stock</p>
                        <p className="font-semibold text-nyc-warning">
                          {inventoryData.filter(item => item.status === "Low Stock").length}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Out of Stock</p>
                        <p className="font-semibold text-nyc-danger">
                          {inventoryData.filter(item => item.status === "Out of Stock").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="vendors" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="w-full md:w-auto">
                  <Input placeholder="Search vendors..." className="w-full md:w-80" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button size="sm">+ Add Vendor</Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Vendor Directory</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendorData.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">{vendor.name}</TableCell>
                          <TableCell>{vendor.contact}</TableCell>
                          <TableCell>{vendor.email}</TableCell>
                          <TableCell>{vendor.category}</TableCell>
                          <TableCell>
                            <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
                              {vendor.status}
                            </Badge>
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
            </TabsContent>
            
            <TabsContent value="procurement" className="space-y-4">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Purchase Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Coming soon! Purchase order management and tracking.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expenses" className="space-y-4">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Expense Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-gray-500">
                    Coming soon! Track and categorize business expenses.
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

export default ERP;
