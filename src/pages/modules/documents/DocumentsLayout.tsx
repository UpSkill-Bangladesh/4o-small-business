
import React, { useState } from 'react';
import { Menu, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface DocumentsLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DocumentsLayout: React.FC<DocumentsLayoutProps> = ({ children, title }) => {
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
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DocumentsLayout;
