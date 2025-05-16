
import React, { useState } from 'react';
import { Menu, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

interface DocumentsLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DocumentsLayout: React.FC<DocumentsLayoutProps> = ({ children, title }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
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
        {/* Top Navigation */}
        <header className="bg-card border-b border-border py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-foreground hover:bg-accent p-2 rounded-md transition-colors focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            
            <h1 className="text-xl md:text-2xl font-semibold text-high-contrast">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <Button className="hover-lift">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background text-foreground">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DocumentsLayout;
