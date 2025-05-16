
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import {
  BarChart, 
  Calendar, 
  FileText, 
  Home, 
  Layers, 
  Settings, 
  User, 
  Users,
  PieChart,
  FolderOpen,
  LogOut
} from 'lucide-react';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />
  },
  {
    title: "ERP",
    href: "/erp",
    icon: <Layers className="h-5 w-5" />
  },
  {
    title: "CRM",
    href: "/crm",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "HR",
    href: "/hr",
    icon: <User className="h-5 w-5" />
  },
  {
    title: "Accounting & Tax",
    href: "/accounting",
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: <Calendar className="h-5 w-5" />
  },
  {
    title: "Smart Dashboard",
    href: "/smart-dashboard",
    icon: <BarChart className="h-5 w-5" />
  },
  {
    title: "Documents",
    href: "/documents",
    icon: <FolderOpen className="h-5 w-5" />
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <PieChart className="h-5 w-5" />
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />
  }
];

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isMobile,
  isOpen,
  onClose
}) => {
  const location = useLocation();
  const { user, userProfile, signOut } = useAuth();
  
  if (isMobile && !isOpen) {
    return null;
  }
  
  // Get user initials for the avatar
  const getInitials = () => {
    if (userProfile) {
      const firstName = userProfile.first_name || '';
      const lastName = userProfile.last_name || '';
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };
  
  return (
    <div
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col",
        isMobile ? "fixed inset-y-0 left-0 z-50 w-64" : "w-64",
        isMobile && !isOpen ? "hidden" : ""
      )}
    >
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-white">NYC</span>
          <span className="text-xl font-bold text-nyc-tertiary ml-1">BizHub</span>
        </Link>
        
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 px-4">
        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={isMobile ? onClose : undefined}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                location.pathname === item.href
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-nyc-tertiary flex items-center justify-center text-white">
              {getInitials()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {userProfile?.first_name ? `${userProfile.first_name} ${userProfile.last_name || ''}` : user?.email}
              </p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="text-gray-400 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
