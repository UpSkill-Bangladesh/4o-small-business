
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/auth/AuthPage";
import UserProfile from "./pages/UserProfile";
import BusinessSetup from "./pages/onboarding/BusinessSetup";
import ERP from "./pages/modules/ERP";
import CRM from "./pages/modules/CRM";
import HR from "./pages/modules/HR";
import Calendar from "./pages/modules/Calendar";
import Accounting from "./pages/modules/accounting";
import SmartDashboard from "./pages/modules/SmartDashboard";
import Documents from "./pages/modules/documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        {/* Fixed theme switcher for easy access */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeSwitcher variant="ghost" className="bg-background/70 backdrop-blur-md border shadow-sm hover:shadow-md" />
        </div>
        
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Dashboard and module routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/onboarding" element={<BusinessSetup />} />
            <Route path="/erp" element={<ERP />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/hr" element={<HR />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/smart-dashboard" element={<SmartDashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
