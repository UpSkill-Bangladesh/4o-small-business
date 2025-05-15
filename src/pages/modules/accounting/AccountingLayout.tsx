
import React, { useState } from 'react';
import { FileText, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccountingLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AccountingLayout: React.FC<AccountingLayoutProps> = ({ children, title }) => {
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
            {title}
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
          <QuickStats />
          
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
              
              {children}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountingLayout;
