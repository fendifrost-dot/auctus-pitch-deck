import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Invest from "./pages/Invest.tsx";
import InvestDetail from "./pages/InvestDetail.tsx";
import InvestCheckout from "./pages/InvestCheckout.tsx";
import InvestorDashboard from "./pages/InvestorDashboard.tsx";
import Raise from "./pages/Raise.tsx";
import OnboardIssuer from "./pages/OnboardIssuer.tsx";
import IssuerDashboard from "./pages/IssuerDashboard.tsx";
import Admin from "./pages/Admin.tsx";
import AdminIssuers from "./pages/AdminIssuers.tsx";
import AdminOfferings from "./pages/AdminOfferings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Investor */}
            <Route path="/invest" element={<Invest />} />
            <Route path="/invest/:id" element={<InvestDetail />} />
            <Route
              path="/invest/:id/checkout"
              element={
                <ProtectedRoute roles={["investor", "admin"]}>
                  <InvestCheckout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/investor"
              element={
                <ProtectedRoute roles={["investor", "admin"]}>
                  <InvestorDashboard />
                </ProtectedRoute>
              }
            />

            {/* Issuer */}
            <Route path="/raise" element={<Raise />} />
            <Route path="/onboard/issuer" element={<OnboardIssuer />} />
            <Route
              path="/dashboard/issuer"
              element={
                <ProtectedRoute roles={["issuer", "admin"]}>
                  <IssuerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/issuers"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminIssuers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/offerings"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminOfferings />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
