
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentForm from "./pages/StudentForm";
import Facilities from "./pages/Facilities";
import FacilityForm from "./pages/FacilityForm";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/new" element={<StudentForm />} />
              <Route path="/students/edit/:id" element={<StudentForm />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/facilities/new" element={<FacilityForm />} />
              <Route path="/facilities/edit/:id" element={<FacilityForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
