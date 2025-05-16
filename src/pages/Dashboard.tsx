
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import RequireAuth from '@/components/auth/RequireAuth';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userProfile } = useAuth();
  
  return (
    <RequireAuth>
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
          {/* Header */}
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
              Dashboard
            </h1>
            <div>
              {/* Placeholder for header actions */}
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome{userProfile?.first_name ? `, ${userProfile?.first_name}` : ''}!
              </h2>
              <p className="text-gray-600">
                Here's an overview of your business activities
              </p>
            </div>
            
            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <p className="text-gray-600">Your activity will be displayed here.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Financial Summary</h3>
                <p className="text-gray-600">Your financial data will be displayed here.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium mb-4">Tasks</h3>
                <p className="text-gray-600">Your upcoming tasks will be displayed here.</p>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Recent Documents</h3>
              <p className="text-gray-600">Your recent documents will be displayed here.</p>
            </div>
          </main>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Dashboard;
