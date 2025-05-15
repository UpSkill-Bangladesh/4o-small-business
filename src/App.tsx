
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BusinessSetup from "./pages/onboarding/BusinessSetup";
import ERP from "./pages/modules/ERP";
import CRM from "./pages/modules/CRM";
import HR from "./pages/modules/HR";
import Calendar from "./pages/modules/Calendar";
import Accounting from "./pages/modules/accounting";
import SmartDashboard from "./pages/modules/SmartDashboard";
import Documents from "./pages/modules/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<BusinessSetup />} />
          
          {/* Dashboard and module routes */}
          <Route path="/dashboard" element={<Dashboard />} />
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
  </QueryClientProvider>
);

export default App;
